import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  bannerText: { 
    type: String, 
    default: 'IK Copy, ITC Exxact এবং হেভি-ডিউটি জেরক্স মেশিন কিনুন সরাসরি ডাইরেক্ট মিল পাইকারি রেটে।' 
  },
  searchPlaceholder: { 
    type: String, 
    default: 'পেপার, মেসিন বা কালি সার্চ করুন...' 
  }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);