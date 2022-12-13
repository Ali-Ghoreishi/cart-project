import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

import { sequelize } from '../configs/connection';


class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare title: string;
    declare price: number;
    declare quantity: number;
    // timestamps!
    declare created_At: number;
    declare updated_At: number;
}


Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,     
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],                                       
                    msg: "Title must be at least 1 characters and at most 40 characters"
                },
                notEmpty: {
                    msg: "Title should not be empty"
                },
                is: {
                    args: [/^[A-Za-z0-9]*$/],                        
                    msg: "Please enter a valid title"
                },
                notNull: {
                    msg: 'Please enter title'
                }
            }
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],                                       
                    msg: "Price must be at least 1 characters and at most 40 characters"
                },
                notEmpty: {
                    msg: "Price should not be empty"
                },
                notNull: {
                    msg: 'Please enter price'
                },
                isNumeric: {
                    msg: "Price should be number"
                }
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 20],                                      
                    msg: "Quantity must be at least 1 characters and at most 20 characters"
                },
                notEmpty: {
                    msg: "Quantity should not be empty"
                },
                notNull: {
                    msg: 'Please enter quantity'
                },
                isInt: {
                    msg: "Quantity should be number"
                }
            }
        },
        created_At: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        updated_At: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'products',
        sequelize
    }
);


//! Relation between Product and Cart_item tables
// Product.hasOne(Cart_item, {foreignKey: 'product_id', as: 'cart_products'})
//! End


export { Product }