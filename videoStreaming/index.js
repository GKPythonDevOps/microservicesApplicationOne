//****** Constants for hello world **********
const express = require('express') //Loads the Express library for use in our code
const http = require("http")
const app = express() // Creates an instance of an Express app 

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}


const PORT = process.env.PORT; // Our HTTP server will listen on port 3000.

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
// ""http://awsvideostorage""
const VIDEO_STORAGE_PORT = process.env.VIDEO_STORAGE_PORT;
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

app.listen(PORT, () => {
  console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video in docker container and http://localhost:4001/video in local host`);
});

//**********************************************************************************************************************