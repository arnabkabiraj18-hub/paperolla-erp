import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

// ১. সমস্ত কাস্টমারের তালিকা লোড করা (Admin Dashboard-এর জন্য)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. ফোন নম্বর দিয়ে নির্দিষ্ট কাস্টমার খোঁজা (Login বা Profile Check-এর জন্য)
router.get('/:phone', async (req, res) => {
  try {
    const customer = await Customer.findOne({ phone: req.params.phone });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ৩. নতুন কাস্টমার রেজিস্টার করা
router.post('/', async (req, res) => {
  try {
    const { name, shopName, phone, location } = req.body;
    
    // কাস্টমার আগে থেকেই রেজিস্টার করা আছে কিনা যাচাই
    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const customer = new Customer({
      name,
      shopName,
      phone,
      location
    });

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৪. কাস্টমারের বাকি (Due) বা তথ্য আপডেট করা
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৫. কাস্টমার মুছে ফেলা
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;