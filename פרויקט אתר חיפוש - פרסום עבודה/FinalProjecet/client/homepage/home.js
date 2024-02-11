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
  