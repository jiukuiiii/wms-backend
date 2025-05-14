import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  boxBarcode: String,
  productBarcode: { type: String, required: true, unique: true },
  name: String,
  spec: String,
  stock: { type: Number, default: 0 },
});

export default mongoose.model('Product', productSchema);