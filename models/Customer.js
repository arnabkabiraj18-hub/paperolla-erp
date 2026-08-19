import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  shopName: { 
    type: String, 
    default: '' 
  },
  phone: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  location: { 
    type: String, 
    default: '' 
  },
  totalPurchased: { 
    type: Number, 
    default: 0 
  },
  paidAmount: { 
    type: Number, 
    default: 0 
  },
  dueAmount: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);