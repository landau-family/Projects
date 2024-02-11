

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
//פעולה להפעלה בעת העלאת הדף
$(document).ready(function () {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //שאילתה להבאת האיזורים מהשרת
  var areas;//משתנה להכלת מערך איזורים

  $.ajax(getSetting({}, "GET", "area")).done(function (response) {

    areas = JSON.parse(response);


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //הכנסת האזורים לתוך הדרופבוקס
    populateDropdown("residentialArea", areas);
    console.log(areas);

  });

});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//בעת לחיצה על כפתור ההרשמות
$('#employerForm').submit(function (event) {
  event.preventDefault();

  //הכנסת הערכים למשתנים
  const identityCard = $('#identityCard').val();
  const email = $('#email').val();
  const username = $('#name').val();
  const residentialArea = $('#residentialArea').val();

  //בדיקה אם האימייל תקין והודעה בהתאם
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  //בדיקה אם תעודת הזהות תקינה והודעה בהתאם
  if (!isValidID(identityCard)) {
    alert('Please enter a valid ID.');
    return;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //הכנסת הערכים לאובייקט
  const data = {
    "email": email,
    "id": identityCard,
    "area": residentialArea,
    "name": username,
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //שאילת להוספת מעסיק
  $.ajax(getSetting(data, "POST", "employer")).done(function (response) {
    alert("seccessfully subscribed");

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //שאילתה לקבלת מפתח זיהוי עבור המעסיק החדש שנוצר
    $.ajax(getSetting(data, "POST", "login")).done(function (response) {

      //שמירה באחסון המקומי
      localStorage.setItem('token', response.token);

      //מעבר לאיזור האישי
      window.location.href = '../../employer_personal_area/home/home.html';


    }).fail(function (jqXHR, textStatus, errorThrown) {

      //טיפול בשגיאות
      if (jqXHR.status === 400) {
        console.log(jqXHR.responseText); //שגיאה בקבלת מפתח זיהוי עם הודעה בהתאם לתגובה מהשרת
        alert('You are not a subscriber to the registration site, click register');
      } else {
        // טיפול בשגיאות אחרות
        alert('An error occurred. Please try again later.');
      }
    });
  }).fail(function (jqXHR, textStatus, errorThrown) {
    //טיפול בשגיאות ברישום על ידי הדפסת ההודעה המתאימה
    alert(jqXHR.responseText);
  });

});