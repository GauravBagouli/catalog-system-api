import { ProductType, ProductTypeAttributes, ProductTypeCreationAttributes } from "../models/productType";
import { generateErrorMsg } from '../../lib/errorLib';
import { FindOptions } from "sequelize";

/**
 * Creates a new product type
 * @param payload - Partial product type data for creation
 * @returns Created product type as plain JSON
 */
export const createProductType = async (
  payload: ProductTypeCreationAttributes
): Promise<ProductTypeAttributes> => {
  try {
    const result = await ProductType.create(payload);
    return result.get({ plain: true }) as ProductTypeAttributes;
  } catch (err: any) {
    throw generateErrorMsg('ProductTypeManager.createProductType', err);
  }
};


/**
 * Get a product type with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One product type as plain JSON
 */
export const getProductType = async (
  options: FindOptions = {}
): Promise<ProductTypeAttributes | null> => {
  try {
    const result = await ProductType.findOne(options);
    
    if (!result) return null;

    return result.get({ plain: true }) as ProductTypeAttributes;
  } catch (err: any) {
    throw generateErrorMsg('ProductTypeManager.getProductType', err);
  }
};


/**
 * Get all product type with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of product types as plain JSON
 */
export const getProductTypes = async (
  options: FindOptions = {}
): Promise<ProductTypeAttributes[]> => {
  try {
    const result = await ProductType.findAll(options);
    return result.map(productType => productType.get({ plain: true })) as ProductTypeAttributes[];
  } catch (err: any) {
    throw generateErrorMsg('ProductTypeManager.getProductTypes', err);
  }
};