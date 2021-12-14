import mongoose from 'mongoose';
import orderSchema from "./orderSchema.js";

const Order = mongoose.model('Order', orderSchema);
export default Order;
