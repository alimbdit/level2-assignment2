import { Document, Schema, model } from 'mongoose';



// order interface

export type TOrder = {
    email: string;
    productId: string;
    price: number;
    quantity: number;
}