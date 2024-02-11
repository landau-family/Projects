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

      //הכנסת הערכים הפרטים האישיים של המעסיק
      $("#employerName").text(response.employer.name);
      $("#employerEmail").text(response.employer.email);
      $("#employerIDCard").text(response.employer.id);
      $("#employerFullName").text(response.employer.name);
      $("#employerResidentialArea").text(response.employer.area);


user=response.employer;
      //++++++++++++++++++++++++++++++++++++++++++++++
      //שאילתה להבאת כל האיזורים

      $.ajax(getSetting({}, "GET", "area")).done(function (response) {
        areas = JSON.parse(response)//הכנסת האיזורים למערך
        populateDropdown("residentialArea2", areas);//הכנסת האיזורים ל-דרופבוקס על ידי פעולה

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //שאילתה להבאת המקצועות, חייב להתבצע רק לאחר הבאת האיזורים בגלל שגיאות זמן ריצה שנוצרות העקב הפעולה הא-סינכרונית

        $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
          professions = res//הכנסה למערך מקצועות

          
          // Populate drop-downs for Area and Professions using the populateDropdown function
          populateDropdown("residentialArea2", areas);
        });
      });
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText);
    });//במקרה של שגיאה הצגת ההודעה
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
    mail = user.emali;
  }
  let n;
  if ($("#employerName2").val()) {
    n = $("#employerName2").val();
  }
  else {
    n = user.name;
  }
  let area;

  area = $("#residentialArea2").val();

  //הכנסת הערכים לאובייקט
  updatedData = {
    "name": n,
    "email": mail,
    "area": area,
    "id": user.id
  };

  $("#residentialArea2").prop("disabled", true);//אי אפשור שדה בחירת איזור

  //שאילתה לעדכון פרטי המעסיק בשרת
  $.ajax(getSetting(updatedData, "PUT", "employer")).done(function (response) {

    // עדכון הפרטים בשדות פרטי המעסיק
    $("input").prop("disabled", true);
    $("#updateBtn").show();
    $("#finishUpdateBtn").hide();
   
 

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
