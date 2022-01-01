const AWS = require('aws-sdk')
const express = require('express')
const app = express()

const PORT = process.env.PORT;

if (!process.env.PORT) {
  throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
// const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
// const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

// console.log(`Serving videos from Azure storage account ${STORAGE_ACCOUNT_NAME}.`);


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
    

app.listen(PORT, () => {
  console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video in docker container and http://localhost:4000/video in local host`);
});