import express, { Request, Response } from "express";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {

    try {
        const productData = req.body;

        // will call service
        const result = await ProductServices.createProductIntoDB(productData)

        // send response
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }


}


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
}

export const ProductControllers = {
    createProduct,
    getAllProducts,
}