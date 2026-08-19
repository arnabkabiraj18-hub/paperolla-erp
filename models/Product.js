import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Paper Products', 'Xerox Machines', 'Ink & Toners', 'Accessories', 'All']
  },
  cost: { 
    type: Number, 
    required: true,
    min: 0 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stock: { 
    type: Number, 
    required: true,
    default: 0,
    min: 0 
  },
  minAlert: { 
    type: Number, 
    default: 5 
  },
  image: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' 
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);