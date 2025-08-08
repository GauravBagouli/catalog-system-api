import { Request, Response } from 'express';
import { ProductType } from '../data/models/productType';
import { Product } from '../data/models/product';
import { Variant } from '../data/models/variant';
import { Addon } from '../data/models/addon';

// Add Product Type
export const addProductType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const type = await ProductType.create({ name });
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product type' });
  }
};

// Add Product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Add Variant
export const addVariant = async (req: Request, res: Response) => {
  try {
    const variant = await Variant.create(req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add variant' });
  }
};

// Add Addon (only for food)
export const addAddon = async (req: Request, res: Response) => {
  try {
    const addon = await Addon.create(req.body);
    res.status(201).json(addon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add addon' });
  }
};

// Get All Products with variants and addons
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [ProductType, Variant, Addon],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Products by Type
export const getProductsByType = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;

    const products = await Product.findAll({
      where: { product_type_id: typeId },
      include: [ProductType, Variant, Addon],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by type' });
  }
};
