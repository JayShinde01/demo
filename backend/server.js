const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@12345',        // 🔒 your MySQL password
  database: 'testdb'   // ✅ ensure this DB and table exist
});

// INSERT user (POST /api/form)
app.post('/api/form', (req, res) => {
    console.log("in api");
    
  const { name, email, password } = req.body;
    console.log(name);


  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
db.query(sql, [name, email, password], (err, result) => {
  if (err) {
    console.error('❌ MySQL Insert Error:', err);  // <--- Log this!
    return res.status(500).send('Database error: ' + err.message);
  }
  res.send('User registered successfully');
});

});

// GET all users (GET /api/users)
app.get('/api/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
