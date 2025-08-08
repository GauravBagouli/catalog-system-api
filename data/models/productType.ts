import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../connection/connection';

export interface ProductTypeAttributes {
  id: number;
  name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type ProductTypeCreationAttributes = Optional<ProductTypeAttributes, 'id' | 'status' | 'created_at' | 'updated_at'>;

export class ProductType extends Model<ProductTypeAttributes, ProductTypeCreationAttributes> implements ProductTypeAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

ProductType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'ProductType',
  }
);
