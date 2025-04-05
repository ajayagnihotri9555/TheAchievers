const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword', // change this
    database: 'THEACHIEVERS'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ Connected to MySQL');
});

// ✅ Register API
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('User already exists or error occurred');
        res.send('✅ User registered!');
    });
});

// ✅ Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err || results.length === 0) return res.status(401).send('❌ Invalid username');

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(401).send('❌ Wrong password');
        res.send('✅ Login successful!');
    });
});

// ✅ Submit Score
app.post('/submit-score', (req, res) => {
    const { username, score } = req.body;

    const sqlGetUser = 'SELECT id FROM users WHERE username = ?';
    db.query(sqlGetUser, [username], (err, results) => {
        if (err || results.length === 0) return res.status(404).send('❌ User not found');

        const userId = results[0].id;
        const sqlInsert = 'INSERT INTO leaderboard (user_id, score) VALUES (?, ?)';

        db.query(sqlInsert, [userId, score], (err) => {
            if (err) return res.status(500).send('❌ Failed to submit score');
            res.send('✅ Score submitted!');
        });
    });
});

// ✅ Leaderboard API
app.get('/leaderboard', (req, res) => {
    const sql = `
        SELECT u.username, MAX(l.score) as score
        FROM leaderboard l
        JOIN users u ON l.user_id = u.id
        GROUP BY u.username
        ORDER BY score DESC
        LIMIT 10
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('❌ Failed to fetch leaderboard');
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
