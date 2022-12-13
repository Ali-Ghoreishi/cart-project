"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../configs/connection");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    updated_At: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'products',
    sequelize: connection_1.sequelize
});
//# sourceMappingURL=Product.js.map