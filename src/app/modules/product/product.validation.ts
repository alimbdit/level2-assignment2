import Joi from 'joi'



// joi validation schema


const variantJoiValidationSchema = Joi.object({
    type: Joi.string().trim().required(),
    value: Joi.string().trim().required(),
});
const inventoryJoiValidationSchema = Joi.object({
    quantity: Joi.number().integer().min(0).required(),
    inStock: Joi.boolean().required(),
});

const productJoiValidationSchema = Joi.object({
    name: Joi.string().required().max(50),
    description: Joi.string().min(10).required(),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string().trim()).min(1).required(),
    variants: Joi.array().items(variantJoiValidationSchema).min(1).required(),
    inventory: inventoryJoiValidationSchema.required(),

})

export default productJoiValidationSchema
