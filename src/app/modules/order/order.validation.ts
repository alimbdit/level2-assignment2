import Joi from 'joi';

const orderJoiValidationSchema = Joi.object({
  email: Joi.string().trim().required().email().messages({
    'any.required': 'EMAIL is required',
    'string.empty': 'Email can not be empty!',
    'string.email': 'please provide a valid email address',
  }),
  productId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'any.required': 'ProductId is required',
      'string.empty': 'productId can not be empty!',
      'string.pattern.base': 'please provide a valid productId',
    }),
  price: Joi.number().required().min(0).messages({
    'any.required': 'PRICE is required',
    'number.min': 'PRICE can not be less then 0!',
    'number.base': 'PRICE must be a number',
  }),
  quantity: Joi.number().required().min(1).messages({
    'any.required': 'QUANTITY is required',
    'number.min': 'QUANTITY can not be less then 1!',
    'number.base': 'QUANTITY must be a number',
  }),
});

export default orderJoiValidationSchema;
