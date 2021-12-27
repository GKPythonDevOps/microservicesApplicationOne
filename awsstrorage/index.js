
const AWS = require('aws-sdk')
const express = require('express')
const app = express()


app.get('/video', (req, res) => {
  const s3 = new AWS.S3()

  const params = {
    Bucket: "videostoragebucketformicroservicesapplication", 
    Key: "file_example_MP4_480_1_5MG.mp4"
  }

  s3.getObject(params, (err, rest) => {
    if (err) throw err;

    const b64 = Buffer.from(rest.Body).toString('base64');
    
    const mimeType = 'video/mp4';

    
    // This is to display Video 
    res.send(`<video src="data:${mimeType};base64,${b64}" controls>
    Your browser does not support the video tag.
  </video>`)
    
  });
});
    
port = 4000;
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});