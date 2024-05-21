import { Document, Schema, Types, model } from 'mongoose';

// order interface

export type TOrder = {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
};

// export type StudentModel = Model<TOrder, Record<string, never>, StudentMethods>;
