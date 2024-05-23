import Joi from 'joi';

// joi validation schema
// joi schema for product variant
const variantJoiValidationSchema = Joi.object({
  type: Joi.string().trim().required().messages({
    'any.required': 'VARIANT TYPE is required',
    'string.empty': 'VARIANT TYPE can not be empty',
  }),
  value: Joi.string().trim().required().messages({
    'any.required': 'VARIANT VALUE is required',
    'string.empty': 'VARIANT Value can not be empty',
  }),
});

// joi schema for product inventory
const inventoryJoiValidationSchema = Joi.object({
  quantity: Joi.number().integer().min(0).required().messages({
    'any.required': 'INVENTORY QUANTITY is required',
    'number.empty': 'INVENTORY QUANTITY can not be empty',
    'number.min': 'INVENTORY QUANTITY can not be less than 0',
  }),
  inStock: Joi.boolean().required().messages({
    'any.required': 'INVENTORY STOCK is required',
    'boolean.base': 'INVENTORY STOCK should have a boolean value',
  }),
});

// joi schema for product
const productJoiValidationSchema = Joi.object({
  name: Joi.string().required().max(50).messages({
    'any.required': 'PRODUCT NAME is required',
    'string.empty': 'PRODUCT NAME can not be empty',
    'string.max': 'PRODUCT Name can not be more than 50 characters',
  }),
  description: Joi.string().min(10).required().messages({
    'any.required': 'DESCRIPTION is required',
    'string.empty': 'DESCRIPTION NAME can not be empty',
    'string.min': 'DESCRIPTION Name can not be less than 10 characters',
  }),
  price: Joi.number().required().min(0).messages({
    'any.required': 'PRICE is required',
    'number.empty': 'PRICE can not be empty',
    'number.min': 'PRICE can not be less than 0',
  }),
  category: Joi.string().required().messages({
    'any.required': 'CATEGORY is required',
    'string.empty': 'CATEGORY can not be empty',
  }),
  tags: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    'any.required': 'TAGS is required',
    'array.includesRequiredUnknowns': 'TAG must be a string',
    'array.min': 'There must be at least one TAG',
  }),
  variants: Joi.array()
    .items(variantJoiValidationSchema)
    .min(1)
    .required()
    .messages({
      'any.required': 'VARIANT is required',
      'array.includesRequiredUnknowns': 'TAG must be an object',
      'array.min': 'There must be at least one VARIANT',
    }),
  inventory: inventoryJoiValidationSchema.required().messages({
    'any.required': 'INVENTORY is required',
    'object.base': 'INVENTORY must be an object',
  }),
  //   isDeleted: Joi.boolean(),
});

export default productJoiValidationSchema;
