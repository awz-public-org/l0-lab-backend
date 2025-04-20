const express = require('express');
const mysql = require('mysql2/promise'); // or use pg for PostgreSQL
const cors = require('cors');

const app = express();
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_database'
};

app.get('/user', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT CURRENT_USER() AS user');
    await connection.end();
    res.send(rows[0].user);
  } catch (error) {
    res.status(500).send('Database error');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
