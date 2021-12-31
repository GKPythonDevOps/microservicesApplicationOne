//****** Constants for hello world **********
const express = require('express') //Loads the Express library for use in our code
const http = require("http")
const app = express() // Creates an instance of an Express app 
const port = 4001 // Our HTTP server will listen on port 3000.

const VIDEO_STORAGE_HOST = "http://s2"
const VIDEO_STORAGE_PORT = 4000
//**********************************************

//****** Constants for video stream **********
// const fs =  require("fs") //Loads the (built-in) fs library so we can use the Node.js filesystem API.
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

console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", (req, res) => {
    const forwardRequest = http.request( // Forward the request to the video storage microservice.
        {
            host: VIDEO_STORAGE_HOST,
            port: VIDEO_STORAGE_PORT,
            path: '/video?path=file_example_MP4_480_1_5MG.mp4', // Video path is hard-coded for the moment.
            method: 'GET',
            headers: req.headers
        }, 
        forwardResponse => {
            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
            forwardResponse.pipe(res);
        }
    );
    
    req.pipe(forwardRequest);
});

//
// Starts the HTTP server.
//

app.listen(port, () => {
  console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});

//**********************************************************************************************************************