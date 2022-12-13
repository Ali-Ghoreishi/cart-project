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
const Product_1 = require("../database/models/Product");
const helperFunc_1 = require("../utils/helperFunc");
exports.insertProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = (0, helperFunc_1.current_time)();
        const { title, price, quantity } = req.body;
        const product = yield Product_1.Product.findOne({ where: { title: title } });
        if (product) {
            const error = new Error("There is already a Product with this title");
            error.statusCode = 409;
            throw error;
        }
        else {
            yield Product_1.Product.create({ title, price, quantity, created_At: time, updated_At: time });
            const message = ["Product insertion was successful"];
            res
                .status(201)
                .json({ status: true, message, data: {} });
        }
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
//# sourceMappingURL=productController.js.map