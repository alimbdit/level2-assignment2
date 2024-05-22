import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

//  Schemas for product

const variantSchema = new Schema<TVariant>(
    {
        type: {
            type: String,
            required: [true, 'Variant type is required'],
            trim: true,
        },
        value: {
            type: String,
            required: [true, 'Variant value is required'],
            trim: true,
        },
    },
    { _id: false },
);

const inventorySchema = new Schema<TInventory>(
    {
        quantity: {
            type: Number,
            required: [true, 'Inventory quantity is required'],
            min: [0, 'Inventory quantity must be at least 0']
        },
        inStock: {
            type: Boolean,
            required: [true, 'Inventory inStock is required']
        },
    },
    { _id: false },
);

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minLength: [10, 'Description can not be less than 10 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    tags: {
        type: [String],
        required: [true, 'Tags is required'],
        // validate: {
        //     validator: function (tags: string[]) {
        //         return tags.length > 0;
        //     },
        //     message: 'There must be at least one tag'
        // }
    },
    variants: {
        type: [variantSchema],
        required: [true, 'Variants is required'],
        // validate: {
        //     validator: function (variants: TVariant[]) {
        //         return variants.length > 0;
        //     },
        //     message: 'There must be at least one variant'
        // }
    },
    inventory: {
        type: inventorySchema,
        required: [true, 'Inventory is required']
    },
});

//  product model
export const Product = model<TProduct>('Product', productSchema);
