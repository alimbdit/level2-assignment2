import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderJoiValidationSchema from './order.validation';

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { error, value } = orderJoiValidationSchema.validate(orderData);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.details,
        error: error.details,
      });
    }
    const result = await OrderServices.createOrderInDB(value);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const result = await OrderServices.getOrdersByEmailFromDB(
        email as string,
      );
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email!`,
        data: result,
      });
    } else {
      const result = await OrderServices.getOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      // error: err,
    });
  }
};

export const OrderController = {
  CreateOrder,
  getAllOrders,
};
