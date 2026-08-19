import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  txnId: { 
    type: String, 
    required: true,
    unique: true 
  },
  customer: { 
    type: String, 
    required: true,
    trim: true 
  },
  customerPhone: {
    type: String,
    default: ''
  },
  item: { 
    type: String, 
    required: true 
  },
  qty: { 
    type: Number, 
    required: true,
    min: 1 
  },
  unitCost: { 
    type: Number, 
    required: true 
  },
  unitSell: { 
    type: Number, 
    required: true 
  },
  buyingCost: { 
    type: Number, 
    required: true 
  },
  totalBill: { 
    type: Number, 
    required: true 
  },
  netProfit: { 
    type: Number, 
    required: true 
  },
  paymentMode: {
    type: String,
    enum: ['Cash (নগদ)', 'Online UPI', 'Credit (বাকি)', 'Card'],
    default: 'Cash (নগদ)'
  },
  paymentStatus: { 
    type: String, 
    enum: ['Paid', 'Partial', 'Due'],
    default: 'Paid' 
  },
  paidAmount: {
    type: Number,
    default: function() {
      return this.paymentStatus === 'Due' ? 0 : this.totalBill;
    }
  },
  dueAmount: {
    type: Number,
    default: function() {
      return this.paymentStatus === 'Due' ? this.totalBill : 0;
    }
  }
}, { timestamps: true });

export default mongoose.model('Sale', saleSchema);