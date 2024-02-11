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
    //הכנסת המפתח לאחסון המקומי
  $.ajax(getSetting({}, "GET", "employer")).done(function (response) {
 //הכנסת הערכים הפרטים האישיים של המעסיק
 $("#employerName").text(response.employer.name);
 $("#employerEmail").text(response.employer.email);
 $("#employerIDCard").text(response.employer.id);
 $("#employerFullName").text(response.employer.name);
 $("#employerResidentialArea").text(response.employer.area);

  });
});
