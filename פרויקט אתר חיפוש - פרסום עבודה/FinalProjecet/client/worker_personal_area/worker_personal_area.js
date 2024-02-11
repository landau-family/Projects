//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//משתנים גלובאליים
var jobPostings;//פרסומי עבודה
var originalJobPostings;
var jobPostingsStatus = [];//סטאטוס פרסומי עבודה: 1=פתוח, 0=סגור
var areas;
var proffessions;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//פעילות בעת שהדף מוכן
$(document).ready(function () {


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //פעולה להבאת פרטי העובד
  function getEmployeeData() {

    //שאילתה לקבלת העובד
    $.ajax(getSetting({}, "GET", "worker")).done(function (response) {

      //הכנסת פרטי העובד לדף
      $("#employeeName").text(response.worker.name);
      $("#employeeEmail").text(response.worker.email);
      $("#employeeIDCard").text(response.worker.id);
      $("#employeeFullName").text(response.worker.name);


      //אתחול פרסומי העבודה
      jobPostings = response.jobPosting;
      originalJobPostings = jobPostings;
      //אתחול סטאטוס פרסומי עבודה
      initArray(jobPostingsStatus, '0', jobPostings.length);

      //הצגת פרסומי העבודה לדף
      var jobPostingsHTML = "";
      let count = 0;
      for (var i = 0; i < jobPostings.length; i++) {

        //שאילתה לקבלת המעסיק עבור כל פרסום עבודה
        $.ajax(getSetting({}, "GET", "employer/" + jobPostings[i].employer)).done(function (response) {
          var employer = response.employer;

          //הוספת הפרסום עבודה הנוכחי לדף
          jobPostings[count]["employer"] = employer;

          jobPostingsHTML += "<div class='jobPosting' onclick='showDesc( " + count + ")'>";
          jobPostingsHTML += writeJobPosttoWorker(jobPostings, count);
          jobPostingsHTML += "</div>";

          count++;

          //הוספה לדף
          $("#jobPostings").append(jobPostingsHTML);
          jobPostingsHTML = "";
        }).fail(function (jqXHR, textStatus, errorThrown) {

          // בעת שגיאה הדפסת ההודעה המתאימה
          console.log(jqXHR.responseText);
        });
      }

    });

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //מילוי שדות הפלטור

    //הכנסת אזורים
    $.ajax(getSetting({}, "GET", "area")).done(function (response) {
      areas = JSON.parse(response)//הכנסת האיזורים למערך
      populateCheckboxes('areas', areas, "areas");
    });

    //הכנסת מקצועות
    $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
      proffessions = res//הכנסה למערך מקצועות
      populateCheckboxes('pros', proffessions, "pros");


    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  // הפעלת הפעולה להצגת הנתונים בדף
  getEmployeeData();

});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//לחיצה על עדכון פרטים אישיים
$("#updateBtn").click(function () {

  //אפשור השדות להכנסת קלט
  $("input").prop("disabled", false);

  // החלפת כפתור עדכון בכפתור סיום
  $("#finishUpdateBtn").show();
  $(this).hide();
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// סיום עדכון
$("#updateDetailsForm").submit(function (event) {
  event.preventDefault();

  //הכנסת הנתונים למשתנים
  let mail;
  if ($("#employeeEmail2").val()) {
    mail = $("#employeeEmail2").val();
    //בדיקה אם המייל תקין
    if (!isValidEmail(mail)) {
      alert('Please enter a valid email address.');
      return;
    }
  }
  else {
    mail = $("#employeeEmail").text();
  }
  let n;
  if ($("#employeeName2").val()) {
    n = $("#employeeName2").val();
  }
  else {
    n = $("#employeeName").text();
  }

  //הכנסת המשתנים לאובייקט
  var updatedData = {
    "name": n,
    "email": mail,
    // Add more fields as needed
  };

  //שאילתה לעדכון העובד
  $.ajax(getSetting(updatedData, "PUT", "worker")).done(function (response) {
    console.log(response);

    //עדכון בפרטים החדשים ללא ריענון הדף + אי אפשור שדות העדכון וריקון שדות הקלט
    $("input").prop("disabled", true);
    $("#updateBtn").show();
    $("#finishUpdateBtn").hide();
    $("#employeeName").text(response.name);
    $("#employeeEmail").text(response.email);
    $("#employeeIDCard").text(response.id);
    $("#employeeFullName").text(response.name);
    document.getElementById("employeeName2").value = "";
    document.getElementById("employeeEmail2").value = "";

  }).fail(function (jqXHR, textStatus, errorThrown) {

    //טיפול בשגיאות
    if (jqXHR.status === 400) {
      console.log(jqXHR.responseText); // שגיאת מפתח זיהוי
      alert('You are not a subscriber to the registration site, click register');
    } else {
      //שגיאה אחרת
      alert('An error occurred. Please try again later.');
    }
  });

});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//שליחה לפעולה להצגת תאור

function showDesc(i) {
  showJobPostingDesc(jobPostings, jobPostingsStatus, i);
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על כפתור סינון


$("#applyFilterBtn").click(function () {

  var jobPostingsHTML = "";
  jobPostings = filterJobPostings();
  for (let i = 0; i < jobPostings.length; i++) {

    jobPostingsHTML += "<div class='jobPosting' onclick='showDesc( " + i + ")'>";
    jobPostingsHTML += writeJobPosttoWorker(jobPostings, i);
    jobPostingsHTML += "</div>";

  }
  initArray(jobPostingsStatus, '0', jobPostings.length);
  $("#jobPostings").html(jobPostingsHTML);

});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על תפריט צד



$("#hamburger").click(function() {
  $(this).toggleClass("change");
  $(".sidebar").toggleClass("sidebar-open");
  $("#jobPostings").toggleClass("unexpand");
  $("#updateDetailsSection").toggleClass("unexpand");
});
