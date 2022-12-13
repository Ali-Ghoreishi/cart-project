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
exports.current_time = exports.check_product = exports.check_user = void 0;
const User_1 = require("../database/models/User");
const Product_1 = require("../database/models/Product");
function current_time() {
    return new Date().getTime();
}
exports.current_time = current_time;
const check_user = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { id: user_id } });
    if (!user) {
        const error = new Error("No User was found with this ID");
        error.statusCode = 404;
        throw error;
    }
    return user;
});
exports.check_user = check_user;
const check_product = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ where: { id: product_id } });
    if (!product) {
        const error = new Error("No Product was found with this ID");
        error.statusCode = 404;
        throw error;
    }
    return product;
});
exports.check_product = check_product;
//# sourceMappingURL=helperFunc.js.map