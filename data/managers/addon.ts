import { generateErrorMsg } from '../../lib/errorLib';
import { FindOptions } from 'sequelize';
import { Addon, AddonAttributes, AddonCreationAttributes } from "../models/addon";

/**
 * Creates a new addon
 * @param payload - Partial addon data for creation
 * @returns Created addon as plain JSON
 */
export const createAddon = async (
  payload: AddonCreationAttributes
): Promise<AddonAttributes> => {
  try {
    const result = await Addon.create(payload);
    return result.get({ plain: true }) as AddonAttributes;
  } catch (err: any) {
    throw generateErrorMsg('AddonManager.createAddon', err);
  }
};


/**
 * Get all addon with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of addon as plain JSON
 */
export const getAllAddons = async (
  options: FindOptions = {}
): Promise<AddonAttributes[]> => {
  try {
    const result = await Addon.findAll(options);
    return result.map(addon => addon.get({ plain: true })) as AddonAttributes[];
  } catch (err: any) {
    throw generateErrorMsg('AddonManager.getAllAddons', err);
  }
};


/**
 * Get one addon with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One addon as plain JSON
 */
export const getOneAddon = async (
  options: FindOptions = {}
): Promise<AddonAttributes | null> => {
  try {
    const result = await Addon.findOne(options);

    if (!result) return null;

    return result.get({ plain: true }) as AddonAttributes;
  } catch (err: any) {
    throw generateErrorMsg('AddonManager.getOneAddon', err);
  }
};


/**
 * Creates multiple addons in bulk
 * @param payload - Array of addon data for creation
 * @returns Array of created addons as plain JSON
 */
export const bulkCreateAddons = async (
  payload: AddonCreationAttributes[]
): Promise<AddonAttributes[]> => {
  try {
    const results = await Addon.bulkCreate(payload);
    return results.map(r => r.get({ plain: true })) as AddonAttributes[];
  } catch (err: any) {
    throw generateErrorMsg('AddonManager.bulkCreateAddons', err);
  }
};