import express from 'express';
import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

const router = express.Router();

// ১. সমস্ত সেলস ও ট্রানজ্যাকশন হিস্টোরি ফেচ করা
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. নতুন অফলাইন/অনলাইন সেলস তৈরি এবং স্টক স্বয়ংক্রিয়ভাবে কমানো
router.post('/', async (req, res) => {
  const { productId, qty } = req.body;
  const sale = new Sale(req.body);

  try {
    const newSale = await sale.save();

    // প্রোডাক্ট আইডি থাকলে ইনভেন্টরি স্টক থেকে স্বয়ংক্রিয়ভাবে কোয়ান্টিটি কমিয়ে দেওয়া
    if (productId && qty) {
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -parseInt(qty) }
      });
    }

    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৩. ট্রানজ্যাকশন বা পেমেন্ট স্ট্যাটাস আপডেট করা (যেমন: বাকি পরিশোধ)
router.put('/:id', async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৪. সেলস রেকর্ড ডিলিট করা
router.delete('/:id', async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sale record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;