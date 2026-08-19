import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';

const router = express.Router();

// ১. সমস্ত লাইভ অর্ডার লোড করা
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. নতুন কাস্টমার অর্ডার ডাটাবেসে সেভ করা
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৩. অর্ডার স্ট্যাটাস আপডেট ও স্বয়ংক্রিয়ভাবে স্টক/সেলস ম্যানেজ করা
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // অর্ডার Completed হলে ইনভেন্টরি স্টক কাটবে এবং সেলস লেজারে যোগ হবে
    if (status === 'Completed' && order.status !== 'Completed') {
      for (const item of order.items) {
        if (item.productId || item.id) {
          const prodId = item.productId || item.id;
          await Product.findByIdAndUpdate(prodId, {
            $inc: { stock: -parseInt(item.qty) }
          });
        }

        // সেলস লেজারে যুক্ত করা
        const totalBill = item.price * item.qty;
        const buyingCost = (item.cost || 0) * item.qty;
        const newSale = new Sale({
          txnId: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          customer: order.customer,
          customerPhone: order.phone || '',
          item: `${item.name} (${item.qty} Pcs)`,
          qty: item.qty,
          unitCost: item.cost || 0,
          unitSell: item.price,
          buyingCost: buyingCost,
          totalBill: totalBill,
          netProfit: totalBill - buyingCost,
          paymentMode: order.paymentMode || 'Cash (নগদ)',
          paymentStatus: order.paymentStatus || 'Paid'
        });
        await newSale.save();
      }
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৪. অর্ডার ডিলিট করা
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;