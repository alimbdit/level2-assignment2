import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // will call service
    const result = await ProductServices.createProductIntoDB(productData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    if (!result) {
      throw new Error('Products not found');
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      // error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(500).json({
        success: false,
        message: 'Product not found!',
      });
    } else {
      const result = await ProductServices.getSingleProductFromDB(productId);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Product not found',
        });
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      // error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
