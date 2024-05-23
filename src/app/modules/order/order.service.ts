import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderInDB = async (order: TOrder) => {
  const { productId, quantity } = order;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product is not available!');
  }
  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  product.inventory.quantity -= quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();
  const result = await Order.create(order);
  return result;
};

const getOrdersFromDB = async () => {
  const result = await Order.find().select(['-_id', '-__v']);
  if (!result.length) {
    throw new Error('Orders not found');
  }
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email }).select(['-_id', '-__v']);
  if (!result.length) {
    throw new Error('Orders not found');
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getOrdersFromDB,
  getOrdersByEmailFromDB,
};
