import { Document, Schema, model } from 'mongoose';



// order interface

export type Order = {
    email: string;
    productId: string;
    price: number;
    quantity: number;
}