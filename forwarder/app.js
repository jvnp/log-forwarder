const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Enable CORS middleware
app.use(cors());
app.options('*', cors());

// Define a middleware for allowing cross-domain requests
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

app.use(allowCrossDomain);

app.use(bodyParser.json());

let logs = [];

const postData = (url = "", data = {}) => fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    }).then(response => response.json()
    ).catch((err) => console.log("Error:"+err));

setInterval(() => {
    postData("http://localhost:8000", { logs: logs} ).then((response) => {
        console.log(response.message);
        logs = [];
    });
}, 10000);

app.get("/", (req, res, next) => {
    console.log(logs.push(Date.now()));
    return res.json({ message: "Initial Forwarder HTTP-GET Response!" });
});

module.exports = app;