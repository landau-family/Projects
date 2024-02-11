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
  

  //שאילתה לקבלת מפתח זיהוי
  
  $.ajax(getSetting({}, "GET", "worker")).done(function (response) {

    //הכנסת פרטי העובד לדף
    $("#employeeName").text(response.worker.name);
    $("#employeeEmail").text(response.worker.email);
    $("#employeeIDCard").text(response.worker.id);
    $("#employeeFullName").text(response.worker.name);

  });
});
