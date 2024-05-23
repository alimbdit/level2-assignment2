import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: [true, 'ProductId is required'],
  },
  price: {
    type: Number,
    required: [true, 'PRICE is required'],
    min: [0, 'Price must be at least 0'],
  },
  quantity: {
    type: Number,
    required: [true, 'QUANTITY is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

orderSchema.post('save', function (doc, next) {
  next();
});

export const Order = model<TOrder>('Order', orderSchema);
