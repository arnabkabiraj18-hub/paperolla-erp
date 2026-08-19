import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
  },
  name: { 
    type: String, 
    required: true 
  },
  qty: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  cost: { 
    type: Number, 
    default: 0 
  },
  price: { 
    type: Number, 
    required: true 
  }
});

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  customer: { 
    type: String, 
    required: true, 
    trim: true 
  },
  phone: { 
    type: String, 
    default: '' 
  },
  deliveryAddress: { 
    type: String, 
    default: '' 
  },
  items: [orderItemSchema],
  total: { 
    type: Number, 
    required: true 
  },
  paymentMode: { 
    type: String, 
    enum: ['Cash (নগদ)', 'Online UPI', 'Credit (বাকি)', 'Card'], 
    default: 'Cash (নগদ)' 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Paid', 'Due'], 
    default: 'Paid' 
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);