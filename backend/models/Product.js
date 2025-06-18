import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    // enum: ['Golden Shawl', 'Honor Shawl', 'Felicitation Shawl', 'Temple Shawl', 'Other']
     enum: ['Sarees',"Men’s Wear","Women’s Wear",'Ethnic Collections','Festive Wear','Daily Wear','Premium Edition', 'Other']
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [{
    url: String,
    public_id: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);