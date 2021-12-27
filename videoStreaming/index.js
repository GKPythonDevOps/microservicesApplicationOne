
//****** Constants for hello world **********
const express = require('express') //Loads the Express library for use in our code
const app = express() // Creates an instance of an Express app 
const port = 3000 // Our HTTP server will listen on port 3000. 
//**********************************************

//****** Constants for video stream **********
const fs =  require("fs") //Loads the (built-in) fs library so we can use the Node.js filesystem API.
//**********************************************


//***************** HTTP server which response back with Hello world ***************************************************

// app.get('/', (req, res) => { //Creates a handler for the main HTTP route
//   res.send('Hello World!') //The handler prints Hello World! in the web browser.
// })

// app.listen(port, () => { //Initiates the HTTP server
//   console.log(`Example app listening at http://localhost:${port}`) //The callback prints a message when the server has started.
// })

//**********************************************************************************************************************

//***************** HTTP server which will responsd back with video stream ***************************************************

app.get("/video", (req, res) => { //Defines the HTTP route for streaming video. This is a REST API for streaming video!


  const path = "./video/F1.mp4"; //The path of the video file that we’ll stream to the browser
  fs.stat(path, (err, stats) => { //Handles any errors that may occur
      if (err) {
          console.error("An error occurred ");
          res.sendStatus(500);
          return;
      }

      res.writeHead(200, { //Retrieves the video file size. We’ll encode this in the HTTP header as a response to the web browser. 
          "Content-Length": stats.size, //Sends a response header to the web browser, including the content length and mime type
          "Content-Type": "video/mp4",
      });
      fs.createReadStream(path).pipe(res); //Streams the video to the web browser. Yes it’s this simple!
  });
});


app.listen(port, () => {
  console.log(`Microservice listening on port ${port}, point your browser at http://localhost:3000/video`);
});

//**********************************************************************************************************************