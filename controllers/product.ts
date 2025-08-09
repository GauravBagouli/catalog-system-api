import { decryptData, getStringFromQuery } from "../services/authService";
import { Request, Response } from "express";
import { OrderItem } from "sequelize";
import { createProduct, getProduct, getProducts } from '../data/managers/product';
import { createProductType, getProductType, getProductTypes } from "../data/managers/productType";
import { ProductAttributes } from "../data/models/product";
import { ProductType, ProductTypeAttributes } from "../data/models/productType";
import { Variant } from "../data/models/variant";
import { Addon } from "../data/models/addon";
import { AddProductParams } from "../lib/params";
import { bulkCreateAddons } from "../data/managers/addon";
import { bulkCreateVariants } from "../data/managers/variant";


//This controller is used to add product
export const addProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const params = decryptData<AddProductParams>(req.body.payload);

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

    let product = await createProduct(payload);

    if(params?.addons && params?.addons?.length > 0) {
      const addonPayload = params.addons.map((addon) => {
        return {
          product_id: product.id,
          name: addon.name,
          price: addon.price
        }
      })
      await bulkCreateAddons(addonPayload);
    }

    if(params?.variants && params?.variants?.length > 0) {
      const variantPayload = params.variants.map((variant) => {
        return {
          product_id: product.id,
          size: variant.size,
          color: variant.color,
          price: variant.price,
          stock: variant.stock,
          sku: variant.sku
        }
      })
      await bulkCreateVariants(variantPayload);
    }

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
    let searchQuery: {
      where: { status: string, product_type_id?: number };
      order: OrderItem[];
    } = {
      where: { 
        status: 'Active' 
      },
      order: [['created_at', 'DESC']],
    };
    if(req.query.payload) {
      const payloadStr = getStringFromQuery(req.query.payload, 'payload');
      const params = decryptData<ProductAttributes>(payloadStr);
      if (params && params.product_type_id) {
        searchQuery.where.product_type_id = params.product_type_id;
      }
    }
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


// This function is used to get product type list
export const getProductTypeList = async (req: Request, res: Response) => {
  try {
    const productTypes = await getProductTypes();
    res.status(200).json({ success: true, data: productTypes });
  } catch (error) {
    console.log("================ Error while getting product type list ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
};


// 
export const getProductDetails = async (req: Request, res: Response) => {
  try {
    if(!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const payloadStr = getStringFromQuery(req.query.payload, 'payload');

    const params = decryptData<ProductAttributes>(payloadStr);

    if (!params || !params.id) {
      return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
    }

    const searchQuery = {
      where: {
        id: params.id
      },
      include: [
        { model: ProductType, attributes: ['id', 'name'] },
        { model: Variant, attributes: ['id', 'size', 'color', 'price', 'stock', 'sku'] },
        { model: Addon, attributes: ['id', 'name', 'price'] }
      ]
    }

    const product = await getProduct(searchQuery);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("================ Error while getting product details ================", error);
    if (error instanceof Error) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(409).json({ success: false, message: 'Something went wrong' });
    }
  }
}