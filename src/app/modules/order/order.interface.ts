import { Document, Schema, model } from 'mongoose';

export type Order = {
    email: string;
    productId: string;
    price: number;
    quantity: number;
}