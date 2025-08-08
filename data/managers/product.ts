import { Product, ProductAttributes, ProductCreationAttributes } from "../models/product";
import { generateErrorMsg } from '../../lib/errorLib';
import { FindOptions } from 'sequelize';

/**
 * Creates a new product
 * @param payload - Partial product data for creation
 * @returns Created product as plain JSON
 */
export const createProduct = async (
  payload: ProductCreationAttributes
): Promise<ProductAttributes> => {
  try {
    const result = await Product.create(payload);
    return result.get({ plain: true }) as ProductAttributes;
  } catch (err: any) {
    throw generateErrorMsg('ProductManager.createProduct', err);
  }
};


/**
 * Get all products with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of products as plain JSON
 */
export const getProducts = async (
  options: FindOptions = {}
): Promise<ProductAttributes[]> => {
  try {
    const result = await Product.findAll(options);
    return result.map(product => product.get({ plain: true })) as ProductAttributes[];
  } catch (err: any) {
    throw generateErrorMsg('ProductManager.getProducts', err);
  }
};


/**
 * Get all products with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One product as plain JSON
 */
export const getProduct = async (
  options: FindOptions = {}
): Promise<ProductAttributes | null> => {
  try {
    const result = await Product.findOne(options);

    if (!result) return null;

    return result.get({ plain: true }) as ProductAttributes;
  } catch (err: any) {
    throw generateErrorMsg('ProductManager.getProduct', err);
  }
};