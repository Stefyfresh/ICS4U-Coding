// jshint esversion:8
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db';
import product from './models/product';

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get('/api/products', async(req, res) => {
	try {
		const products = await product.find({});
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/products/:id', async (req, res) => {
	try {
		const products = await product.findByID(req.params.id);
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post('/api/products', async (req, res) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});