const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amsa@811",
    database: "banner"
});

con.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + con.threadId);
});

app.get('/api/banners/:id', (req, res) => {
    const bannerId = req.params.id;
    con.query('SELECT * FROM banner WHERE id = ?', [bannerId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving banner');
            return;
        }
        res.json(results[0]);
    });
});

app.post('/api/banners', (req, res) => {
    const { title, description, timer, link, visible } = req.body;
    const createdAt = new Date(); // Current date and time
    con.query('INSERT INTO banner (title, description, timer, link, visible, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, timer, link, visible, createdAt],
      (err, result) => {
        if (err) {
            res.status(500).send('Error creating banner');
            return;
        }
        res.status(201).send('Banner created with ID: ' + result.insertId);
    });
});

app.put('/api/banners/:id', (req, res) => {
    const bannerId = req.params.id;
    const { title, description, timer, link, visible } = req.body;
    con.query('UPDATE banner SET title = ?, description = ?, timer = ?, link = ?, visible = ? WHERE id = ?',
      [title, description, timer, link, visible, bannerId],
      (err) => {
        if (err) {
            res.status(500).send('Error updating banner');
            return;
        }
        res.send('Banner updated successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
