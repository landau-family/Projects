const express = require('express');
const fs = require('fs');

const app = express();

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `./images/${imageName}`; // Assuming images are stored in a directory named 'images'

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send('Image not found');
    } else {
      // Determine the content type based on the image file extension
      const contentType = getContentType(imageName);
      res.setHeader('Content-Type', contentType);
      res.send(data);
    }
  });
});

function getContentType(imageName) {
  const extension = imageName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    // Add more cases for other image types if needed
    default:
      return 'application/octet-stream'; // Default content type for unknown files
  }
}


