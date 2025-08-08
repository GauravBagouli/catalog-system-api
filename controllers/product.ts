import { decryptData, getStringFromQuery } from "../services/authService";
import { Request, Response } from "express";
import { OrderItem } from "sequelize";
import { createProduct, getProduct, getProducts } from '../data/managers/product';
import { createProductType, getProductType } from "../data/managers/productType";
import { ProductAttributes } from "../data/models/product";
import { ProductTypeAttributes } from "../data/models/productType";


//This controller is used to add product
export const addProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const params = decryptData<ProductAttributes>(req.body.payload);

    if (!params || !params.product_type_id || !params.name) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    if (
      typeof params.product_type_id !== 'number' ||
      typeof params.name !== 'string'
    ) {
      return res.status(406).json({ success: false, message: 'Invalid product payload' });
    }

    const productTypeQuery = {
      where: {
        id: params.product_type_id
      },
      attributes: ['id']
    };

    let productType = await getProductType(productTypeQuery);

    if (productType === null) {
      return res.status(404).json({ success: false, message: 'Invalid product type' });
    }

    const productQuery = {
      where: {
        product_type_id: params.product_type_id,
        name: params.name
      },
      attributes: ['id']
    };

    let duplicateProduct = await getProduct(productQuery);

    if (duplicateProduct !== null) {
      return res.status(409).json({ success: false, message: 'Product already exists' });
    }

    const payload = {
      product_type_id: params.product_type_id,
      name: params.name,
      description: params.description,
      product_images: params.product_images || []
    };

    await createProduct(payload);
    res.status(200).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.log("================ Error while adding product ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};


// This function is used to add product type
export const addProductType = async (req: Request, res: Response) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    let params = decryptData<ProductTypeAttributes>(req.body.payload);

    if (!params || !params.name) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    if (typeof params.name !== 'string') {
      return res.status(406).json({ success: false, message: 'Invalid product type name' });
    }

    const searchQuery = {
      where: {
        name: params.name
      },
      attributes: ['id']
    };

    let duplicateProduct = await getProductType(searchQuery);

    if (duplicateProduct !== null) {
      return res.status(409).json({ success: false, message: 'Product type name already exists' });
    }

    let payload = {
      name: params.name
    }

    await createProductType(payload);
    res.status(200).json({ success: true, message: 'Product type added successfully' });
  } catch (error) {
    console.log("================ Error while adding product type ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};


// This function is used to get product list
export const getProductList = async (req: Request, res: Response) => {
  try {
    const searchQuery: {
      where: { status: string };
      order: OrderItem[];
    } = {
      where: { 
        status: 'Active' 
      },
      order: [['created_at', 'DESC']],
    };
    const products = await getProducts(searchQuery);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("================ Error while getting product list ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};


// This function is used to get Products by Type
export const getProductsByType = async (req: Request, res: Response) => {
  try {
    if(!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const payloadStr = getStringFromQuery(req.query.payload, 'payload');

    const params = decryptData<ProductAttributes>(payloadStr);

    if (!params || !params.product_type_id) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const searchQuery: {
      where: { product_type_id: number };
      order: OrderItem[];
    } = {
      where: { 
        product_type_id: params.product_type_id
      },
      order: [['created_at', 'DESC']],
    };

    const products = await getProducts(searchQuery);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("================ Error while getting product list by type ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};