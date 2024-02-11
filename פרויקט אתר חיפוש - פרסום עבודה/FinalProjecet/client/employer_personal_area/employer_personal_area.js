// import { getSetting } from "./helpFunctions/settings";
// import { populateDropdown, writeJobPost, initArray, populateDropdownOptions, showJobPostingDescInput } from "./helpFunctions/init";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//משתנים גלובאליים לשימוש בכל זמן הרצת הדף

var jobPostings;//מערך פרסומי עבודה
var areas = [];//איזורים
var professions = [];//מקצועות

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//פעולה להפעלה בעת שהדף מוכן

$(document).ready(function () {

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //פעולה להפעלה בטעינת הדף להצגת פרטים אישיים ופרסומי העבודה של המעסיק

  function getEmployeeData() {

    //+++++++++++++++++++++++++++++++++++++++++++
    //שאילת להבאת פרטי מעסיק

    $.ajax(getSetting({}, "GET", "employer")).done(function (response) {

      //הכנסת הערכים הפרטים האישיים של המעסיק
      $("#employerName").text(response.employer.name);
      $("#employerEmail").text(response.employer.email);
      $("#employerIDCard").text(response.employer.id);
      $("#employerFullName").text(response.employer.name);
      $("#employerResidentialArea").text(response.employer.area);


      //שמירת פרסומי העבודה של המעסיק+משתנה להצגתם בדף
      jobPostings = response.jobPosting;

      //++++++++++++++++++++++++++++++++++++++++++++++
      //שאילתה להבאת כל האיזורים

      $.ajax(getSetting({}, "GET", "area")).done(function (response) {
        areas = JSON.parse(response)//הכנסת האיזורים למערך
        populateDropdown("residentialArea2", areas);//הכנסת האיזורים ל-דרופבוקס על ידי פעולה

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //שאילתה להבאת המקצועות, חייב להתבצע רק לאחר הבאת האיזורים בגלל שגיאות זמן ריצה שנוצרות העקב הפעולה הא-סינכרונית

        $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
          professions = res//הכנסה למערך מקצועות

          //++++++++++++++++++++++++++++++++++++++++++++++++++
          //הצגה דינאמית של פרסומי עבודה
          //המיקום נועד לוודא שגם מערך המקצועות וגם מערך האיזורים יהיו מוכנים לפני ההצגה הדינאמית של פרסומי העבודה

          var jobPostingsHTML = "";
          for (var i = 0; i < jobPostings.length; i++) {
            jobPostingsHTML += "<div class='jobPosting' >";//פרסום עבודה
            jobPostingsHTML += writeJobPost(jobPostings, i);
            jobPostingsHTML += "</div>";
          }
          $("#employerJobPostings").html(jobPostingsHTML);//הצגה בדף
          // Populate drop-downs for Area and Professions using the populateDropdown function
          populateDropdown("areaDropdown", areas);
          populateDropdown("professionDropdown", professions);
        });
      });
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
    });//במקרה של שגיאה הצגת ההודעה
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getEmployeeData();//הפעלת הפעולה


});



//++++++++++++++++++++++++++++++++++++++++++++++++++


//כפתורי אירועים


//++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על סיום יצירת פרסום עבודה חדש

$("#createJobPostingForm").submit(function (event) {
  event.preventDefault();
  $("#createJobPostingBtn").prop("disabled", false);
  // הכנסה למשתנים
  var selectedArea = $("#areaDropdown").val();
  var selectedProfession = $("#professionDropdown").val();
  var description = $("#descriptionInput").val();
  let d = Date();

  // איחוד הנתינים החדשים לאובייקט אחד
  var postData = {
    // Change to the appropriate email
    "employer": $("#employerIDCard").text(), // Change to the appropriate ID
    "dateTime": d,
    "area": selectedArea,
    "proffession": selectedProfession,
    "desc": description
  };

  // שאילתה להוספת פרסום עבודה
  $.ajax(getSetting(postData, "POST", "jobPosting")).done(function (response) {
    console.log(response);

    // הצגת הפרסום עבודה כרגיל על ידי אי אפשור השדות לשינוי
    $("#createJobPostingSection").fadeOut();

    // אתחול השדום וריקונם
    $("#descriptionInput").val("");

    //הוספת הפרסום עבודה למערך והצגתו בדף ללא צורך ברענון
    let i = jobPostings.length
    jobPostings.unshift(response);
    console.log(jobPostings)
    console.log(jobPostings[0]);
    let st = "";
    st += "<div class='jobPosting' >";//פרסום עבודה
    st += writeJobPost(jobPostings, 0);
    st += "</div>";
    //הוספה בדף
    let h=$("#employerJobPostings").html();
    $("#employerJobPostings").html(st);
    $("#employerJobPostings").append(h);
  });
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// אירוע לחיצה על כפתור עדכון פרטי פרסום עבודה

$("#employerJobPostings").on("click", ".updateBtn", function () {
  var index = $(this).data("index");//השמת אינדקס הפרסום עבודה למשתנה
  //השמת ערכי הפרסום עבודה למשתנים
  var jobPostingDiv = $("#employerJobPostings .jobPosting").eq(index);
  var textFields = jobPostingDiv.find("input[type='text']");
  var dropdowns = jobPostingDiv.find("select");
  showJobPostingDescInput(index, 'u');//פעולה להצגת התיאור כשדה קלט טקסט
  // אפשור השדות
  textFields.prop("disabled", false);
  dropdowns.prop("disabled", false);

  //אי אפשור שדות התאריך ותז-מעסיק לשינוי
  jobPostingDiv.find("h4").prop("disabled", true);

  //הצגת כפתור 'סיום' לסיום העדכון
  jobPostingDiv.find(".finishUpdateBtn").show();
  $(this).hide();
});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//עדכון פרטי מעסיק

$("#updateBtn").click(function () {
  //אפשור השדות
  $("input").prop("disabled", false);
  // החלפת כפתור העדכון בכפתור סיום עדכון
  $("#finishUpdateBtn").show();
  $("#residentialArea2").prop("disabled", false);
  $(this).hide();
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//סיום עדכון פרטי מעסיק

$("#updateDetailsForm").submit(function (event) {
  event.preventDefault();
  //הכנסת הערכים החדשים/קודמים למשתנים
  let mail;
  if ($("#employerEmail2").val()) {
    mail = $("#employerEmail2").val();
    //בדיקה אם המייל תקין
    if (!isValidEmail(mail)) {
      alert('Please enter a valid email address.');
      return;
    }
  }
  else {
    mail = $("#employerEmail").text();
  }
  let n;
  if ($("#employerName2").val()) {
    n = $("#employerName2").val();
  }
  else {
    n = $("#employerName").text();
  }
  let area;

  area = $("#residentialArea2").val();

  //הכנסת הערכים לאובייקט
  updatedData = {
    "name": n,
    "email": mail,
    "area": area,
    "id": $("#employerIDCard").text()
  };

  $("#residentialArea2").prop("disabled", true);//אי אפשור שדה בחירת איזור

  //שאילתה לעדכון פרטי המעסיק בשרת
  $.ajax(getSetting(updatedData, "PUT", "employer")).done(function (response) {

    // עדכון הפרטים בשדות פרטי המעסיק
    $("input").prop("disabled", true);
    $("#updateBtn").show();
    $("#finishUpdateBtn").hide();
    $("#employerName").text(response.name);
    $("#employerEmail").text(response.email);
    $("#employerIDCard").text(response.id);
    $("#employerFullName").text(response.name);
    $("#employerResidentialArea").text(response.area);

    //ריקון שדות העדכון
    document.getElementById("employerName2").value = "";
    document.getElementById("employerEmail2").value = "";
    document.getElementById("residentialArea2").value = "";

  }).fail(function (jqXHR, textStatus, errorThrown) {
    // במקרה של שגיאה הצגת ההודעה המתאימה
    if (jqXHR.status === 400) {
      console.log(jqXHR.responseText); //במקרה של בעיית התחברות בשרת
      alert('You are not a subscriber to the registration site, click register');
    } else {
      //עבור תקלה אחרת
      alert('An error occurred. Please try again later.');
    }
  });


});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// סיום עדכון פרסום עבודה

$("#employerJobPostings").on("click", ".finishUpdateBtn", function () {
  //הכנסת הערכים למשתנים
  var index = $(this).data("index");
  var jobPostingDiv = $("#employerJobPostings .jobPosting").eq(index);
  var textFields = jobPostingDiv.find("input[type='text']");
  var dropdowns = jobPostingDiv.find("select");

  //אי אפשור השדות
  textFields.prop("disabled", true);
  dropdowns.prop("disabled", true);

  //החלפת הכפתור סיום עדכון בכתור עדכון
  jobPostingDiv.find(".updateBtn").show();
  $(this).hide();

  // הכנסת הערכים החדשים למשתנים
  var selectedArea = jobPostingDiv.find("select[name='area']").val();
  var selectedProfession = jobPostingDiv.find("select[name='profession']").val();
  var selectedDesc = jobPostingDiv.find(".descriptionInput").val()

  //הכנסת הערכים לאובייקט
  var updateData = {
    "dateTime": jobPostings[index].dateTime,
    "employer": jobPostings[index].employer,
    "area": selectedArea,
    "proffession": selectedProfession,
    "desc": selectedDesc
    // Add more fields as needed
  };

  //עדכון מערך פרסומי העבודה בשאילתה החדשה
  jobPostings[index].area = selectedArea;
  jobPostings[index].proffession = selectedProfession;
  jobPostings[index].desc = selectedDesc;

  //הכנסת הערכים החדשים לפרסום העבודה בדף
  $("#employerJobPostings .jobPosting:eq(" + index + ")").html(writeJobPost(jobPostings, index));

  //שאילתה לעדכון הפרסום עבודה במסד נתונים
  $.ajax(getSetting(updateData, "PUT", "jobPosting")).done(function (response) {
    // Handle the update response if needed
    console.log(response)
  });

});





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//מחיקת פרסום עבודה

$("#employerJobPostings").on("click", ".deleteBtn", function () {
  //השמת הערכים למשתנים
  var index = $(this).data("index");
  var jobPostingDiv = $("#employerJobPostings .jobPosting").eq(index);
  var textFields = jobPostingDiv.find("input[type='text']");
  var dropdowns = jobPostingDiv.find("select");
  var delItem = {
    "dateTime": jobPostings[index].dateTime,
    "employer": jobPostings[index].employer,
  }
  var res = confirm("press OK to confirm delete");
  if (res == true) {
    //אם המשתמש אישר מחיקה
    //שאילתת מחיקה
    var updateSettings = {
      "url": "http://localhost:3000/jobPosting", // Change to your update endpoint
      "method": "DELETE",
      "headers": {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(delItem),
    };

    $.ajax(updateSettings).done(function (response) {
      // Handle the update response if needed
      console.log(response)
      jobPostings = response;
      var jobPostingsHTML = "";
      //הצגת פרסומי העבודה שנותרו
      for (var i = 0; i < jobPostings.length; i++) {
        jobPostingsHTML += "<div class='jobPosting' >";//פרסום עבודה
        jobPostingsHTML += writeJobPost(jobPostings, i);
        jobPostingsHTML += "</div>";
      }
      $("#employerJobPostings").html(jobPostingsHTML);//הצגה בדף
    });
  } else {
    //הודעה מתתאימה במקרה של ביטול מחיקה
    alert("deletion canceled");
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++
//אירוע לחיצה על כפתור יצירת פרסום עבודה

$("#createJobPostingBtn").click(function () {
  $("#createJobPostingBtn").prop("disabled", true);

  // Show the create job posting form
  $("#createJobPostingSection").fadeIn();


});



//+++++++++++++++++++++++++++++++++++++++++++++++++
//אירוע לחיצה על כפתור ביטול יצירת פרסום עבודה

$("#cancelCreateJobPostingBtn").click(function (event) {
  event.preventDefault();
  $("#createJobPostingBtn").prop("disabled", false);

  $("#createJobPostingSection").fadeOut();

  // אתחול השדום וריקונם
  $("#descriptionInput").val("");
});