"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_item_1 = require("../database/models/Cart_item");
const Cart_1 = require("../database/models/Cart");
const helperFunc_1 = require("../utils/helperFunc");
exports.add_product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.personId;
        const time = (0, helperFunc_1.current_time)();
        const { product_id, quantity } = req.body;
        yield (0, helperFunc_1.check_user)(user_id);
        const product = yield (0, helperFunc_1.check_product)(product_id);
        const cart = yield Cart_1.Cart.findOne({ where: { user_id: user_id, status: "unpaid" } });
        if (!cart) {
            let cart = yield Cart_1.Cart.create({ user_id: user_id, created_At: time, updated_At: time });
            yield Cart_item_1.Cart_item.create({ product_id, cart_id: cart.id, price: product.price, quantity, created_At: time, updated_At: time });
            const message = ["The product has been added to the cart"];
            res
                .status(201)
                .json({ status: true, message, data: {} });
        }
        yield Cart_item_1.Cart_item.create({ product_id, cart_id: cart.id, price: product.price, quantity, created_At: time, updated_At: time });
        const message = ["The product has been added to the cart"];
        res
            .status(201)
            .json({ status: true, message, data: {} });
    }
    catch (err) {
        if (err.name === "SequelizeValidationError" || err.name === "ValidationError") {
            let errors = [];
            const errs = err.errors;
            for (var key in errs) {
                errors.push(errs[key].message);
            }
            return res.status(400).json({ status: false, message: errors, data: {} });
        }
        next(err);
    }
});
exports.remove_product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.personId;
        const { product_id } = req.body;
        yield (0, helperFunc_1.check_user)(user_id);
        yield (0, helperFunc_1.check_product)(product_id);
        const cart = yield Cart_1.Cart.findOne({ where: { user_id: user_id, status: "unpaid" } });
        if (!cart) {
            const error = new Error("The cart isn't exist");
            error.statusCode = 404;
            throw error;
        }
        yield Cart_item_1.Cart_item.destroy({
            where: {
                cart_id: cart.id,
                product_id: product_id
            }
        });
        const message = ["The product deleted"];
        res
            .status(200)
            .json({ status: true, message, data: {} });
    }
    catch (err) {
        next(err);
    }
});
exports.update_product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.personId;
        const { product_id, quantity } = req.body;
        yield (0, helperFunc_1.check_user)(user_id);
        yield (0, helperFunc_1.check_product)(product_id);
        const cart = yield Cart_1.Cart.findOne({ where: { user_id: user_id, status: "unpaid" } });
        if (!cart) {
            const error = new Error("The cart isn't exist");
            error.statusCode = 404;
            throw error;
        }
        const item = yield Cart_item_1.Cart_item.findOne({ where: { cart_id: cart.id, product_id: product_id } });
        if (!item) {
            const error = new Error("The product isn't exist");
            error.statusCode = 404;
            throw error;
        }
        yield Cart_item_1.Cart_item.update({ quantity: quantity }, {
            where: {
                cart_id: cart.id,
                product_id: product_id
            }
        });
        const message = ["The product updated"];
        res
            .status(200)
            .json({ status: true, message, data: {} });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=cart_itemController.js.map