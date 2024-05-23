import Joi from 'joi';

// joi validation schema

const variantJoiValidationSchema = Joi.object({
  type: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'VARIANT TYPE is required' }),
  value: Joi.string()
    .trim()
    .required()
    .messages({ 'any.required': 'VARIANT VALUE is required' }),
});
const inventoryJoiValidationSchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({ 'any.required': 'INVENTORY QUANTITY is required' }),
  inStock: Joi.boolean()
    .required()
    .messages({ 'any.required': 'INVENTORY STOCK is required' }),
});

const productJoiValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(50)
    .messages({ 'any.required': 'PRODUCT NAME is required' }),
  description: Joi.string()
    .min(10)
    .required()
    .messages({ 'any.required': 'DESCRIPTION is required' }),
  price: Joi.number()
    .required()
    .min(0)
    .messages({ 'any.required': 'PRICE is required' }),
  category: Joi.string()
    .required()
    .messages({ 'any.required': 'CATEGORY is required' }),
  tags: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required()
    .messages({ 'any.required': 'TAGS is required' }),
  variants: Joi.array()
    .items(variantJoiValidationSchema)
    .min(1)
    .required()
    .messages({ 'any.required': 'VARIANT is required' }),
  inventory: inventoryJoiValidationSchema
    .required()
    .messages({ 'any.required': 'INVENTORY is required' }),
  isDeleted: Joi.boolean(),
});

export default productJoiValidationSchema;
