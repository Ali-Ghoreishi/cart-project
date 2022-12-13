"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const connection_1 = require("../configs/connection");
const Cart_1 = require("./Cart");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 25],
                msg: "Fullname must be at least 4 characters and at most 24 characters"
            },
            notEmpty: {
                msg: "Fullname should not be empty"
            },
            notNull: {
                msg: 'Please enter fullname'
            },
            is: {
                args: [/^[A-Za-z0-9]*$/],
                msg: "Please enter a valid fullname"
            },
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 30],
                msg: "Email must be at least 10 characters"
            },
            isEmail: {
                msg: "Please enter a valid email"
            },
            notEmpty: {
                msg: "Email should not be empty"
            },
            notNull: {
                msg: 'Please enter email'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 20],
                msg: "Password must be at least 10 characters and at most 20 characters"
            },
            notEmpty: {
                msg: "Password should not be empty"
            },
            notNull: {
                msg: 'Please enter password'
            },
            is: {
                args: [/^[A-Za-z0-9]*$/],
                msg: "Please enter a valid password"
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
    tableName: 'users',
    sequelize: connection_1.sequelize
});
User.hasOne(Cart_1.Cart, {
    foreignKey: 'user_id',
    as: 'user_cart'
});
User.beforeCreate((user, options) => {
    return bcryptjs_1.default.hash(user.password, 10)
        .then((hash) => {
        user.password = hash;
    })
        .catch((err) => {
        throw new Error();
    });
});
//# sourceMappingURL=User.js.map