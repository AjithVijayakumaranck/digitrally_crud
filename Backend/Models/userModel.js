import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  address_line_1: {
    type: String,
    required: true,
  },
  address_line_2: {
    type: String,
    required: true,
  },
  
  pin: {
    type: String,
    required: true,
  },
  
  country: {
    type: String,
    required: true,
  },
  
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const USER = models.User || model('User', userSchema);

export default USER;
