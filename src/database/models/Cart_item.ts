import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

import { sequelize } from '../configs/connection';
import { Product } from './Product';
import { Cart } from './Cart';


class Cart_item extends Model<InferAttributes<Cart_item>, InferCreationAttributes<Cart_item>> {
    declare id: CreationOptional<number>;
    declare cart_id: ForeignKey<Cart['id']>;
    declare product_id: ForeignKey<Product['id']>;
    declare price: number;
    declare quantity: number;
    declare created_At: number;
    declare updated_At: number;
}


Cart_item.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,      
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],
                    msg: "price must be at least 1 characters and at most 40 characters"
                },
                isNumeric: {
                    msg: "price must be number"
                },
                notNull: {
                    msg: 'Please enter price'
                },
                notEmpty: {
                    msg: "price should not be empty"
                },
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],
                    msg: "quantity must be at least 1 characters and at most 40 characters"
                },
                isInt: {
                    msg: "quantity must be number"
                },
                notEmpty: {
                    msg: "quantity should not be empty"
                },
                notNull: {
                    msg: 'Please enter quantity'
                },
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
        tableName: 'cart_items',
        sequelize
    }
);


//! Relation between Cart_item and Product tables
Cart_item.belongsTo(Product, { foreignKey: 'product_id', as: 'cart_products' })
//! End


// Hooks
Cart_item.beforeSave((cart_item, options) => {

    const time = new Date().getTime();
    cart_item.updated_At = time
});

export { Cart_item }