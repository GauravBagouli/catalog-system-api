import { DataTypes, Model, Optional } from 'sequelize';
import { ProductType } from './productType';
import sequelize from '../connection/connection';

export interface ProductAttributes {
  id: number;
  product_type_id: number;
  name: string;
  description?: string;
  product_images: any[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'description' | 'product_images' | 'status' | 'created_at' | 'updated_at'>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public product_type_id!: number;
  public name!: string;
  public description?: string;
  public product_images!: any[];
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_images: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    status: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: 'Active'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'Product',
  }
);

Product.belongsTo(ProductType, { 
  foreignKey: 'product_type_id', 
  targetKey: 'id' 
});

ProductType.hasMany(Product, { 
  foreignKey: 'product_type_id', 
  sourceKey: 'id' 
});