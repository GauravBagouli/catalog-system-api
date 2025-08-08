import { decryptData } from "../services/authService";
import { Request, Response } from "express";
import { getProduct } from "../data/managers/product";
import { AddonAttributes } from "../data/models/addon";
import { createAddon, getOneAddon } from "../data/managers/addon";

//This controller is used to add product
export const addAddon = async (req: Request, res: Response) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const params = decryptData<AddonAttributes>(req.body.payload);

    if (!params || !params.product_id || !params.price || !params.name) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    if (
      typeof params.product_id !== 'number' ||
      typeof params.price !== 'number' ||
      typeof params.name !== 'string'
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

    const duplicateAddonQuery = {
      where: {
        product_id: params.product_id,
        name: params.name,
        price: params.price
      },
      attributes: ['id']
    };

    let duplicateAddon = await getOneAddon(duplicateAddonQuery);

    if (duplicateAddon !== null) {
      return res.status(409).json({ success: false, message: 'Addon already exists with same name and price' });
    }

    const payload = {
      product_id: params.product_id,
      name: params.name,
      price: params.price
    };

    await createAddon(payload);
    res.status(200).json({ success: true, message: 'Addon added successfully' });
  } catch (error) {
    console.log("================ Error while adding addon ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};
