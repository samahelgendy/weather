// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
// Start up an instance of app
/* Middleware*/
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 4000;
const server = app.listen(port, listening);
function listening() {
    console.log(`server running onport:http://localhost:${port}`)
}
//get data
app.get("/getData", (req, res) => {
    res.send(projectData);
});
//post data 
app.post("/sendData", (req, res) => {
    projectData = req.body;
    res.send({ message: "successfully sending data" });
});



