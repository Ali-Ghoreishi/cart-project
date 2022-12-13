import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';

import { sequelize } from '../configs/connection';
import { User } from './User';
import { Cart_item } from './Cart_item';


class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {

    declare id: CreationOptional<number>;
    declare user_id: ForeignKey<User['id']>;
    declare total_quantity?: number;
    declare total_price?: number;
    declare status?: string;
    declare address?: string;
    declare created_At: number;
    declare updated_At: number;
}


Cart.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,      // unsigned integer [0 to 4294967295].
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        total_price: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],
                    msg: "Total price must be at least 1 characters and at most 40 characters"
                },
                isNumeric: {
                    msg: "Total price must be number"
                },
                notNull: {
                    msg: 'Please enter total price'
                },
                notEmpty: {
                    msg: "Total price should not be empty"
                },
            }
        },
        total_quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 40],
                    msg: "Total quantity must be at least 1 characters and at most 40 characters"
                },
                isInt: {
                    msg: "Total quantity must be number"
                },
                notEmpty: {
                    msg: "Total quantity should not be empty"
                },
                notNull: {
                    msg: 'Please enter total quantity'
                },
            }
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "unpaid",
            allowNull: false,
            validate: {
                isIn: {
                    args: [['paid', 'unpaid']],
                    msg: "Status must be paid or unpaid"
                },
                notNull: {
                    msg: 'Please enter status'
                },
                notEmpty: {
                    msg: "Status should not be empty"
                },
            }
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: "0",
            allowNull: false,
            validate: {
                len: {
                    args: [1, 70],                                      
                    msg: "Address must be at least 1 characters and at most 70 characters"
                },
                is: {
                    args: [/^[A-Za-z0-9]*$/],                       
                    msg: "Please enter a valid address"
                },
                notEmpty: {
                    msg: "Address should not be empty"
                },
                notNull: {
                    msg: 'Please enter address'
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
        tableName: 'carts',
        sequelize
    }
);


//! Relation between Cart and User tables
// Cart.belongsTo(User, {foreignKey: 'user_id', as: 'user_Cart'})
//! End


//! Relation between Cart_item and Cart tables
Cart.hasMany(Cart_item, { foreignKey: 'cart_id', as: 'cart_cartItem' })
//! End


// Hooks
Cart.beforeSave((cart, options) => {

    const time = new Date().getTime();
    cart.updated_At = time
});

export { Cart }