import express from 'express';
import Setting from '../models/Setting.js';

const router = express.Router();

// সেটিংস ডেটা লোড করা
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ব্যানার ও সার্চ প্লেসহোল্ডার আপডেট করা
router.put('/', async (req, res) => {
  try {
    const { bannerText, searchPlaceholder } = req.body;
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
    }
    if (bannerText !== undefined) settings.bannerText = bannerText;
    if (searchPlaceholder !== undefined) settings.searchPlaceholder = searchPlaceholder;
    
    const updated = await settings.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;