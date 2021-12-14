import mongoose from 'mongoose';
import productSchema from "./productSchema.js";

const Product = mongoose.model('Product', productSchema);

export default Product;
