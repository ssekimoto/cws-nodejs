require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

// 本のリストを取得する
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 新しい本を追加する
app.post('/books', async (req, res) => {
  const { title, author } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 本の情報を更新する
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const result = await pool.query('UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *', [title, author, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 本を削除する
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// サーバーを起動する
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
