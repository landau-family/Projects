
//משתנים גלובאליים
var jobPostings;//פרסומי עבודה
var originalJobPostings;
var jobPostingsStatus = [];//סטאטוס פרסומי עבודה: 1=פתוח, 0=סגור
var areas;
var proffessions;
var currentPage = 1;
const postingsPerPage = 9;
var user;
document.addEventListener('DOMContentLoaded', () => {
    const imageUrl = 'http://localhost:3000/images/back.jpg'; // Replace with your actual image URL
    const imageElement = document.getElementById('bannerImage'); // Assuming you have an <img> element with id 'homepageImage'

    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            imageElement.src = objectURL;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    $.ajax(getSetting({}, "GET", "employer")).done(function (response) {
        user = response.employer;


       
    


      //שמירת פרסומי העבודה של המעסיק+משתנה להצגתם בדף
      jobPostings = response.jobPosting;
      originalJobPostings=jobPostings;
      //++++++++++++++++++++++++++++++++++++++++++++++
      //שאילתה להבאת כל האיזורים

      $.ajax(getSetting({}, "GET", "area")).done(function (response) {
        areas = JSON.parse(response)//הכנסת האיזורים למערך

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //שאילתה להבאת המקצועות, חייב להתבצע רק לאחר הבאת האיזורים בגלל שגיאות זמן ריצה שנוצרות העקב הפעולה הא-סינכרונית

        $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
          professions = res//הכנסה למערך מקצועות

          //++++++++++++++++++++++++++++++++++++++++++++++++++
          //הצגה דינאמית של פרסומי עבודה
          //המיקום נועד לוודא שגם מערך המקצועות וגם מערך האיזורים יהיו מוכנים לפני ההצגה הדינאמית של פרסומי העבודה

          var jobPostingsHTML = "";
          let len=jobPostings.length;
          if(postingsPerPage<jobPostings.length)
          {
            len=postingsPerPage;
          }
          for (var i = 0; i < len; i++) {
            jobPostingsHTML += "<div class='jobPosting' >";//פרסום עבודה
            jobPostingsHTML += writeJobPost(jobPostings, i);
            jobPostingsHTML += "</div>";
          }
          $("#jobPostings").html(jobPostingsHTML);//הצגה בדף
          // Populate drop-downs for Area and Professions using the populateDropdown function
        });
      });
            

            //הצגת פרסומי העבודה לדף

       
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
});
// Assuming you have an array of job postings called jobPostings

// Variables for pagination


function displayJobPostings() {

    console.log("in display");
    const startIndex = (currentPage - 1) * postingsPerPage;
    let endIndex = startIndex + postingsPerPage;
    if (endIndex > jobPostings.length) {
        endIndex = jobPostings.length;
    }
    const currentPostings = jobPostings.slice(startIndex, endIndex);
    console.log(startIndex);
    console.log(endIndex);

    // const jobPostingsDiv = document.getElementById("jobPostings");
    // jobPostingsDiv.innerHTML = "";
    $("#jobPostings").html("");
    var jobPostingsHTML = "";
    let count = startIndex;
    for (var i = startIndex; i < endIndex; i++) {



        //הוספת הפרסום עבודה הנוכחי לדף

        jobPostingsHTML += "<div class='jobPosting' onclick='showDesc(" + i + ")'>";
        jobPostingsHTML += writeJobPost(jobPostings, i);
        jobPostingsHTML += "</div>";


        console.log(jobPostingsHTML);

        //הוספה לדף

    }
    $("#jobPostings").html(jobPostingsHTML);
    jobPostingsHTML = "";

    document.getElementById("currentPage").textContent = `Page ${currentPage}`;
}

// Event listeners for pagination buttons
$("#prevPage").click(function () {
    if (currentPage > 1) {
        currentPage--;
        displayJobPostings();
    }
    console.log(currentPage);
});

$("#nextPage").click(function () {
    const totalPages = Math.ceil(jobPostings.length / postingsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayJobPostings();
    }
    console.log(totalPages);

});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//שליחה לפעולה להצגת תאור

function showDesc(i) {
    showJobPostingDescwithpinpoint(jobPostings, jobPostingsStatus, i);


}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על כפתור סינון


$("#applyFilterBtn").click(function () {
    $.ajax(getSetting({}, "GET", "employer")).done(function (response) {
        user = response.employer;


       
    


      //שמירת פרסומי העבודה של המעסיק+משתנה להצגתם בדף
      jobPostings = response.jobPosting;
      originalJobPostings=jobPostings;
      jobPostings = filterJobPostings();
      //++++++++++++++++++++++++++++++++++++++++++++++
      //שאילתה להבאת כל האיזורים

      $.ajax(getSetting({}, "GET", "area")).done(function (response) {
        areas = JSON.parse(response)//הכנסת האיזורים למערך

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //שאילתה להבאת המקצועות, חייב להתבצע רק לאחר הבאת האיזורים בגלל שגיאות זמן ריצה שנוצרות העקב הפעולה הא-סינכרונית

        $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
          professions = res//הכנסה למערך מקצועות

          //++++++++++++++++++++++++++++++++++++++++++++++++++
          //הצגה דינאמית של פרסומי עבודה
          //המיקום נועד לוודא שגם מערך המקצועות וגם מערך האיזורים יהיו מוכנים לפני ההצגה הדינאמית של פרסומי העבודה

          var jobPostingsHTML = "";
          let len=jobPostings.length;
          if(postingsPerPage<jobPostings.length)
          {
            len=postingsPerPage;
          }
          for (var i = 0; i < len; i++) {
            jobPostingsHTML += "<div class='jobPosting' >";//פרסום עבודה
            jobPostingsHTML += writeJobPost(jobPostings, i);
            jobPostingsHTML += "</div>";
          }
          $("#jobPostings").html(jobPostingsHTML);//הצגה בדף
          // Populate drop-downs for Area and Professions using the populateDropdown function
        });
      });
            

            //הצגת פרסומי העבודה לדף

       
    });

       
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על תפריט צד



$("#hamburger").click(function () {
    $(this).toggleClass("change");
    $(".sidebar").toggleClass("sidebar-open");
    $("#jobPostings").toggleClass("unexpand");
    $("#updateDetailsSection").toggleClass("unexpand");

});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// אירוע לחיצה על כפתור עדכון פרטי פרסום עבודה

$("#jobPostings").on("click", ".updateBtn", function () {
    var index = $(this).data("index");//השמת אינדקס הפרסום עבודה למשתנה
    //השמת ערכי הפרסום עבודה למשתנים
    console.log("hi");
    var jobPostingDiv = $("#jobPostings .jobPosting").eq(index);
    var textFields = jobPostingDiv.find("input[type='text']");
    var dropdowns = jobPostingDiv.find("select");
    // showJobPostingDescInput(index, 'u');//פעולה להצגת התיאור כשדה קלט טקסט
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

  

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// סיום עדכון פרסום עבודה

$("#jobPostings").on("click", ".finishUpdateBtn", function () {
    //הכנסת הערכים למשתנים
    var index = $(this).data("index");
    var jobPostingDiv = $("#jobPostings .jobPosting").eq(index);
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
    $("#jobPostings .jobPosting:eq(" + index + ")").html(writeJobPost(jobPostings, index));
  
    //שאילתה לעדכון הפרסום עבודה במסד נתונים
    $.ajax(getSetting(updateData, "PUT", "jobPosting")).done(function (response) {
      // Handle the update response if needed
      console.log(response)
    });
  
  });
  
  
  
  
  
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //מחיקת פרסום עבודה
  
  $("#jobPostings").on("click", ".deleteBtn", function () {
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
     
  
      $.ajax(getSetting(delItem,"DELETE","jobPosting")).done(function (response) {
        // Handle the update response if needed
        console.log(response)
        jobPostings = response;
        var jobPostingsHTML = "";
        //הצגת פרסומי העבודה שנותרו
        displayJobPostings();
      });
    } else {
      //הודעה מתתאימה במקרה של ביטול מחיקה
      alert("deletion canceled");
    }
  });
  
  