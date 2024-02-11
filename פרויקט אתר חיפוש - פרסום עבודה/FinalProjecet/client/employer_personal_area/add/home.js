// document.getElementById('homeLink').addEventListener('click', function() {
//     window.location.href = 'index.html';
// });
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


  //שאילתה לקבלת מפתח זיהוי
  //+++++++++++++++++++++++++++++++++++++++++++
  //שאילת להבאת פרטי מעסיק

  $.ajax(getSetting({}, "GET", "employer")).done(function (response) {




    user = response.employer;
    //++++++++++++++++++++++++++++++++++++++++++++++
    //שאילתה להבאת כל האיזורים

    $.ajax(getSetting({}, "GET", "area")).done(function (response) {
      areas = JSON.parse(response)//הכנסת האיזורים למערך

      //++++++++++++++++++++++++++++++++++++++++++++++++
      //שאילתה להבאת המקצועות, חייב להתבצע רק לאחר הבאת האיזורים בגלל שגיאות זמן ריצה שנוצרות העקב הפעולה הא-סינכרונית

      $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
        professions = res//הכנסה למערך מקצועות


        // Populate drop-downs for Area and Professions using the populateDropdown function
        populateDropdown("areaDropdown", areas);
        populateDropdown("professionDropdown", professions);
      });
    });
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR.responseText);
  });//במקרה של שגיאה הצגת ההודעה
});






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
  let id;
  $.ajax(getSetting({}, "GET", "jobPosting/key")).done(function (response) {
    id=parseInt(response);
    console.log(id);
    console.log(response);
    // איחוד הנתינים החדשים לאובייקט אחד
    var postData = {
      // Change to the appropriate email
      "employer": user.id, // Change to the appropriate ID
      "dateTime": d,
      "area": selectedArea,
      "proffession": selectedProfession,
      "desc": description,
      "id":id
  };

    // שאילתה להוספת פרסום עבודה
    $.ajax(getSetting(postData, "POST", "jobPosting")).done(function (response) {
      console.log(response);

      // הצגת הפרסום עבודה כרגיל על ידי אי אפשור השדות לשינוי
      // $("#createJobPostingSection").fadeOut();

      // אתחול השדום וריקונם
      $("#descriptionInput").val("");


    });
  });
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

  // $("#createJobPostingSection").fadeOut();

  // אתחול השדום וריקונם
  $("#descriptionInput").val("");
});
