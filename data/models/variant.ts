import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection/connection';
import { Product } from './product';

export interface VariantAttributes {
  id: number;
  product_id: number;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type VariantCreationAttributes = Optional<VariantAttributes, 'id' | 'status' | 'created_at' | 'updated_at'>;

export class Variant extends Model<VariantAttributes, VariantCreationAttributes> implements VariantAttributes {
  public id!: number;
  public product_id!: number;
  public size!: string;
  public color!: string;
  public price!: number;
  public stock!: number;
  public sku!: string;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Variant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Variant',
  }
);

Variant.belongsTo(Product, { 
  foreignKey: 'product_id', 
  targetKey: 'id' 
});

Product.hasMany(Variant, { 
  foreignKey: 'product_id', 
  sourceKey: 'id' 
});