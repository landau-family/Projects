
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
    const data = {
      email: "1",
      id: "1"
    };
  
    //שאילתה לקבלת מפתח זיהוי
    $.ajax(getSetting(data, "POST", "login")).done(function (response) {
  
      //הכנסת המפתח לאחסון המקומי
      localStorage.setItem('token', response.token);});
});
//+++
//פעולה המופעלת בטעינת הדף
$(document).ready(function () { 
});

 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //לחיצה על אישור הרישום
  $('#jobSeekerForm').submit(function (event) {
    event.preventDefault();

    //השמה למשתנים
    const identityCard = $('#identityCard').val();
    const email = $('#email').val();
    const username = $('#name').val();

    //בדיקה אם המייל תקין
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // בדיקה אם הת"ז תקינה
    if (!isValidID(identityCard)) {
      alert('Please enter a valid ID.');
      return;
    }

    //הכנסת הנתונים לאובייקט
    const data = {
      "email": email,
      "id": identityCard,
      "name": username,
      "like":[]

    };

    //שאילתה להוספת העובד החדש
    $.ajax(getSetting(data,"POST","worker")).done(function (response) {
      alert("successfully subscribed!");

      //שאילתה לאחר הוספת העובד לקבלת מפתח זיהוי
      $.ajax(getSetting(data,"POST","login")).done(function (response) {

        //אחסון המפתח זיהוי באחסון המקומי
        localStorage.setItem('token', response.token);

        //מעבר לאיזור האישי של העובד
        window.location.href = '../../worker_personal_area/home/home.html';

      }).fail(function (jqXHR, textStatus, errorThrown) {
        //טיפול בשגיאות
        if (jqXHR.status === 400) {
          console.log(jqXHR.responseText); //שגיאת התחברות
          alert('You are not a subscriber to the registration site, click register');
        } else {
          // שגיאה אחרת
          alert('An error occurred. Please try again later.');
        }
      });
    }).fail(function (jqXHR, textStatus, errorThrown) {
      //הדפסת ההודעה המתאימה במקרה של שגיאה בהוספת העובד
      alert(jqXHR.responseText);
    });
  });

