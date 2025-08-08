import { decryptData } from "../services/authService";
import { Request, Response } from "express";
import { VariantAttributes } from "../data/models/variant";
import { getProduct } from "../data/managers/product";
import { createVariant, getOneVariant } from "../data/managers/variant";

//This controller is used to add product
export const addVariant = async (req: Request, res: Response) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const params = decryptData<VariantAttributes>(req.body.payload);

    if (!params || !params.product_id || !params.price || !params.stock || !params.size || !params.color || !params.sku) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    if (
      typeof params.product_id !== 'number' ||
      typeof params.price !== 'number' ||
      typeof params.stock !== 'number'
    ) {
      return res.status(406).json({ success: false, message: 'Invalid product payload' });
    }

    const productQuery = {
      where: {
        id: params.product_id
      },
      attributes: ['id']
    };

    let product = await getProduct(productQuery);

    if (product === null) {
      return res.status(409).json({ success: false, message: 'Product not found' });
    }

    const duplicateVarientQuery = {
      where: {
        product_id: params.product_id,
        size: params.size,
        color: params.color,
        sku: params.sku
      },
      attributes: ['id']
    };

    let duplicateVariant = await getOneVariant(duplicateVarientQuery);

    if (duplicateVariant !== null) {
      return res.status(409).json({ success: false, message: 'Variant already exists with same size, color and sku' });
    }

    const payload = {
      product_id: params.product_id,
      size: params.size,
      color: params.color,
      price: params.price,
      stock: params.stock,
      sku: params.sku
    };

    await createVariant(payload);
    res.status(200).json({ success: true, message: 'Variant added successfully' });
  } catch (error) {
    console.log("================ Error while adding variant ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};
