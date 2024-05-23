import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<TOrder>('Order', orderSchema);
