import { DataTypes, Model, Optional } from 'sequelize';
import { Product } from './product';
import sequelize from '../connection/connection';

export interface AddonAttributes {
  id: number;
  product_id: number;
  name: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export type AddonCreationAttributes = Optional<AddonAttributes, 'id' | 'created_at' | 'updated_at'>;

export class Addon extends Model<AddonAttributes, AddonCreationAttributes> implements AddonAttributes {
  public id!: number;
  public product_id!: number;
  public name!: string;
  public price!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Addon.init(
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
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    modelName: 'Addon',
  }
);

Addon.belongsTo(Product, { 
  foreignKey: 'product_id', 
  targetKey: 'id' 
});

Product.hasMany(Addon, { 
  foreignKey: 'product_id', 
  sourceKey: 'id' 
});