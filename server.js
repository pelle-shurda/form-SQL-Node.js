const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gastbok-sql-nodejs'
});

db.connect((err) => {
    if (err) {
        console.log('Kunde inte ansluta till databasen:', err);
    } else {
        console.log('Ansluten till databasen.');
    }
});

app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    
    db.query('SELECT meddelande FROM meddelanden WHERE namn = ?', [userMessage], (err, results) => {
        if (err) {
            console.log('Databasfel:', err);
            res.json({ response: 'Något gick fel.' });
        } else if (results.length > 0) {
            res.json({ response: results[0].meddelande });
        } else {
            res.json({ response: 'Jag förstår tyvärr inte.' });
        }
    });
});

app.listen(3000, () => {
    console.log('Servern körs på http://localhost:3000');
});