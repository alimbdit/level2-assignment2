import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiValidationSchema from './product.validation';
import { TProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // data validation using joi
    const { error, value } = productJoiValidationSchema.validate(productData);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error.details,
      });
    }
    // will call service
    const result = await ProductServices.createProductIntoDB(value);
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
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductServices.getProductsBySearchTermFromDB(
        searchTerm as string,
      );
      if (!result.length) {
        throw new Error('Products not found');
      }
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      if (!result) {
        throw new Error('Products not found');
      }
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //     return res.status(500).json({
    //         success: false,
    //         message: 'Product not found!',
    //     });
    // } else {
    // }

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
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      // error: err,
    });
  }
};

// for update

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData: TProduct = req.body;
    // console.log(req.body)

    const { error, value } = productJoiValidationSchema.validate(updatedData);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error: error.details,
      });
    }

    const result = await ProductServices.updateProductFromDB(productId, value);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'No Product found to update!',
      });
    }
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      // error: err,
    });
  }
};

// for delete
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);
    // console.log(result);
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'No Product found to delete!',
      });
    }
  } catch (err: any) {
    // console.log(err);
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
  updateProduct,
  deleteProduct,
};
