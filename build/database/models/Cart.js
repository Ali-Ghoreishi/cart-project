"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../configs/connection");
const Cart_item_1 = require("./Cart_item");
class Cart extends sequelize_1.Model {
}
exports.Cart = Cart;
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    total_price: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    updated_At: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'carts',
    sequelize: connection_1.sequelize
});
Cart.hasMany(Cart_item_1.Cart_item, { foreignKey: 'cart_id', as: 'cart_cartItem' });
Cart.beforeSave((cart, options) => {
    const time = new Date().getTime();
    cart.updated_At = time;
});
//# sourceMappingURL=Cart.js.map