// Install necessary packages: express, mysql
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database connection settings
const db = mysql.createConnection({
    host: 'dbdemoserver0.database.windows.net',
    user: 'sneha',
    password: 'Az900demo@123',
    database: 'dbdemo1'
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO Person (fname, email, msg) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error: ' + err.message });
        }
        res.status(200).json({ message: 'Thank you for contacting us!' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
