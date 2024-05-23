import { Schema, model } from 'mongoose';
import {
    ProductModel,
    TInventory,
    TProduct,
    TVariant,
} from './product.interface';

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
            min: [0, 'Inventory quantity must be at least 0'],
        },
        inStock: {
            type: Boolean,
            required: [true, 'Inventory inStock is required'],
        },
    },
    { _id: false },
);

const productSchema = new Schema<TProduct, ProductModel>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minLength: [10, 'Description can not be less than 10 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0'],
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
        required: [true, 'Inventory is required'],
    },
    //   isDeleted: {
    //     type: Boolean,
    //     default: false,
    //   },
});

//! pre save middleware : will work on create() save()

productSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook: we will save the data')
    next();
});

productSchema.post('save', function (doc, next) {
    // console.log(this, "post hook: we saved our data")

    next();
});

//! query middleware
productSchema.pre('find', async function (next) {
    console.log(this);
    next();
});
productSchema.pre('findOne', async function (next) {
    console.log(this);
    next();
});

//! creating a custom static method

productSchema.statics.isProductExists = async function (name: string) {
    const existingProduct = await Product.findOne({ name });
    return existingProduct;
};

//! creating a custom instance method
// productSchema.methods.isProductExists = async function (name: string) {
//     const existingProduct = await Product.findOne({ name });
//     return existingProduct;
// }

//  product model
export const Product = model<TProduct, ProductModel>('Product', productSchema);
