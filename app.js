const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: '52.72.129.133',
    user: 'root',
    password: 'Vikram@210',
    database: 'registration_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root URL route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { first_name, last_name, mobile_number, password, created_by } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'CALL CreateUser(?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, mobile_number, hashedPassword, created_by], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
