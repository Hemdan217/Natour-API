import mongoose from 'mongoose';

// 2) Connection to the database
/// 3) Schema For Tour

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This name field is required'],
    unique: [true, 'This field must be unique'],
  },
  price: {
    type: Number,
    default: 100,
  },
  rating: {
    type: Number,
    default: 4.1,
  },
});

const tourModel = mongoose.model('tour', tourSchema);

export default tourModel;
