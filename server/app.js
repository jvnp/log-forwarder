const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");

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

// Create a new SQLite3 database instance
const db = new sqlite3.Database(':memory:');

// Database Schema for logs
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log TEXT
  )
`;

// CREATE TABLE query
db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully');
    }
  });

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const selectQuery = `SELECT * FROM logs`;
    db.all(selectQuery, (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            res.status(500).json({ error: 'Failed to retrieve logs' });
        } else {
            console.log(rows);
            res.json(rows);
        }
      });
});

app.post("/", (req, res) => {
    // Insert data into the table
    req.body.logs.map(a => {
        let insertQuery = `INSERT INTO logs (log) VALUES (?)`;
        db.run(insertQuery, [a], (err) => {
            if (err) {
                console.error(`Error inserting data: ${a}`, err.message);
                res.status(500).json({ error: `Failed to add ${a}` });
            } else {
                console.log(`${a} inserted successfully`);
            }
            });
    })
    console.log(req.body);
    res.json({ message: "Log Processed Successfully!" });
});

module.exports = app;