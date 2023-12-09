const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup'
});

// app.post('/signup', (req, res) => {
//   const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
//   const values = [req.body.name, req.body.email, req.body.password];
//   db.query(sql, values, (err, data) => {
//      if (err) {
//        return res.json({ success: false, message: "Error" });
//      }
//      return res.json({ success: true, message: "User registered successfully" });
//   });
//  });
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ success: true, data });
  });
});


app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email`= ? AND `password`= ?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length > 0) {
      // You might want to send more details like user information or a token here
      return res.json({ success: true, user: data[0] });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
