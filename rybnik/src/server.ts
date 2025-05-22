import express from 'express';
import cors from 'cors';
import { Product } from './components/methods/interfaces';
import data from '../db.json';

const app = express();
const PORT = 3006;

app.use(cors());
app.use(express.json());


const products: Product[] = data.products;


app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.json(product || { error: 'Product not found' });
});

app.post('/api/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});