import { Request, Response } from "express";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {

    try {
        const product = req.body;

        // will call service
        const result = await ProductServices.createProductIntoDB(product)

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

export const ProductControllers = {
    createProduct,
}