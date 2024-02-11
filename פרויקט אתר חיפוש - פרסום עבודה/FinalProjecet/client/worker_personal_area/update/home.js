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
      
        $.ajax(getSetting({}, "GET", "worker")).done(function (response) {
          user=response.worker;
        });
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
    mail = user.email;
  }
  let n;
  if ($("#employeeName2").val()) {
    n = $("#employeeName2").val();
  }
  else {
    n = user.name;
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
    // $("#employeeName").text(response.name);
    // $("#employeeEmail").text(response.email);
    // $("#employeeIDCard").text(response.id);
    // $("#employeeFullName").text(response.name);
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
  