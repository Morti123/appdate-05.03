// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});


app.use(cors());
app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM Products WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM Products 
       WHERE name_prefix ILIKE $1 OR full_name ILIKE $1 
       ORDER BY id`,
      [`%${query}%`]
    );
    
    res.json(rows);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM Products WHERE name_prefix ILIKE $1 ORDER BY id',
      [`%${type}%`]
    );
    
    res.json(rows);
  } catch (err) {
    console.error('Error filtering products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));