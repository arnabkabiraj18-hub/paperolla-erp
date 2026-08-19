import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// ১. সমস্ত প্রোডাক্ট ফেচ করা (নতুনগুলো সবার আগে আসবে)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. অ্যাডমিন প্যানেল থেকে নতুন প্রোডাক্ট ডাটাবেসে সেভ করা
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৩. স্টক আপডেট করার জন্য (অর্ডার সম্পন্ন হলে বা অফলাইন বিক্রি হলে)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৪. ইনভেন্টরি থেকে কোনো প্রোডাক্ট মুছে ফেলা
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product successfully deleted from database' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;