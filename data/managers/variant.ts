import { Product, ProductAttributes, ProductCreationAttributes } from "../models/product";
import { generateErrorMsg } from '../../lib/errorLib';
import { FindOptions } from 'sequelize';
import { Variant, VariantAttributes, VariantCreationAttributes } from "../models/variant";

/**
 * Creates a new varient
 * @param payload - Partial varient data for creation
 * @returns Created varient as plain JSON
 */
export const createVariant = async (
  payload: VariantCreationAttributes
): Promise<VariantAttributes> => {
  try {
    const result = await Variant.create(payload);
    return result.get({ plain: true }) as VariantAttributes;
  } catch (err: any) {
    throw generateErrorMsg('VariantManager.createVariant', err);
  }
};


/**
 * Get all varient with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of products as plain JSON
 */
export const getAllVariants = async (
  options: FindOptions = {}
): Promise<VariantAttributes[]> => {
  try {
    const result = await Variant.findAll(options);
    return result.map(variant => variant.get({ plain: true })) as VariantAttributes[];
  } catch (err: any) {
    throw generateErrorMsg('VariantManager.getAllVariants', err);
  }
};


/**
 * Get one variant with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One variant as plain JSON
 */
export const getOneVariant = async (
  options: FindOptions = {}
): Promise<VariantAttributes | null> => {
  try {
    const result = await Variant.findOne(options);

    if (!result) return null;

    return result.get({ plain: true }) as VariantAttributes;
  } catch (err: any) {
    throw generateErrorMsg('VariantManager.getOneVariant', err);
  }
};