import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    default: 'KRIVARA COUTURE'
  },
  businessAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  contactDetails: {
    phone: String,
    email: String,
    whatsapp: String
  },
  paymentDetails: {
    gpayUpiId: String
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Settings', settingsSchema);