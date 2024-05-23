import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error('Product already exists!');
  }
  const result = await Product.create(productData); //built in static method

  // const product = new Product(productData);   // creating an instance

  // if (await product.isProductExists(productData.name)) {
  //   throw new Error('Product already exists!')
  // }

  // const result = await product.save()
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getProductsBySearchTermFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm as string, $options: 'i' } },
      { description: { $regex: searchTerm as string, $options: 'i' } },
    ],
  }).select(['-_id', '-__v']);
  return result;
};

// get product by id
const getSingleProductFromDB = async (id: string) => {
  // const result = await Product.findOne({ _id: id });
  const result = await Product.findById(id).select(['-_id', '-__v']);
  // console.log(result, 'service');
  return result;
};

// & update a product
const updateProductFromDB = async (id: string, updatedData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  }).select(['-_id', '-__v']);
  // console.log(result, 'services');

  return result;
};

// * delete a product
const deleteProductFromDB = async (id: string) => {
  // const result = await Product.findOne({ _id: id });
  const result = await Product.deleteOne({ _id: id });
  // console.log(result, 'services');

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  getProductsBySearchTermFromDB,
};
