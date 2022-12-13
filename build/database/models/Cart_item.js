"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart_item = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../configs/connection");
const Product_1 = require("./Product");
class Cart_item extends sequelize_1.Model {
}
exports.Cart_item = Cart_item;
Cart_item.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    updated_At: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'cart_items',
    sequelize: connection_1.sequelize
});
Cart_item.belongsTo(Product_1.Product, { foreignKey: 'product_id', as: 'cart_products' });
Cart_item.beforeSave((cart_item, options) => {
    const time = new Date().getTime();
    cart_item.updated_At = time;
});
//# sourceMappingURL=Cart_item.js.map