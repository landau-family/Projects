
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//פעולה להפעלה לאחר טעינת הדף
$(document).ready(function () {
});
// document.getElementById('homeLink').addEventListener('click', function() {
//     window.location.href = 'index.html';
// });
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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// בלחיצה על הרשמות
$('a[href="registration.html"]').click(function (event) {
  event.preventDefault();
  const role = $('input[name="role"]:checked').val(); // הכנסת סוג המשתמש שנבחר למשתנה

  //עבור עובד
  if (role === 'employee') {
    window.location.href = '../register/worker_register.html'; //הפני'ה לרישום עובד

    //עבור מעסיק
  } else if (role === 'employer') {
    window.location.href = '../register/employer_register.html'; //הפני'ה לרישום מעסיק
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//בעת לחיצה על כפתור התחברות
$('#loginForm').submit(function (event) {

  //הכנסת הנתונים למשתנים
  event.preventDefault();
  const username = $('#username').val();
  const password = $('#password').val();
  const role = $('input[name="role"]:checked').val();

  // בדיקת תקינות כתובת האימייל
  if (!isValidEmail(username)) {
    alert('Please enter a valid email address.');
    return;
  }

  // בדיקת תקינות הת"ז
  if (!isValidID(password)) {
    alert('Please enter a valid ID.');
    return;
  }

  //הכנסת הנתונים התקינים לאובייקט
  const data = {
    email: username,
    id: password
  };

  //שאילתה לקבלת מפתח זיהוי
  $.ajax(getSetting(data, "POST", "login")).done(function (response) {

    //הכנסת המפתח לאחסון המקומי
    localStorage.setItem('token', response.token);

    //עבור עובד
    if (role === 'employee') {
      //שאילתה לקבלת העובד
      $.ajax(getSetting({}, "GET", "worker")).done(function (response) {

        //אם העובד קיים אז מעבר לאיזור האישי שלו
        window.location.href = '../../worker_personal_area/home/home.html'; // Redirect to employee registration page
      }).fail(function (jqXHR) {

        //במקרה של כשלון - סימן שאין כזה עובד
        alert("you are not an employee");
      });

      //עבור מעסיק
    } else if (role === 'employer') {

      //שאילתה לקבלת המעסיק
      $.ajax(getSetting({}, "GET", "employer")).done(function (response) {

        //אם קיים כזה מעסיק אז מועבר לאיזור האישי שלו
        window.location.href = '../../employer_personal_area/home/home.html'; // Redirect to employer registration page

      }).fail(function (jqXHR) {

        //במקרה של כשלון - אין כזה מעסיק
        alert("you are not an employer");
      });
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {

    //טיפול בכשל בקבלת מפתח זיהוי
    if (jqXHR.status === 400) {
      console.log(jqXHR.responseText); // כשל בהתחברות
      alert('You are not a subscriber to the registration site, click register');
    } else {
      //כשל אחר
      alert('An error occurred. Please try again later.');
    }
  });
});
