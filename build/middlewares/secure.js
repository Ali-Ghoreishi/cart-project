"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10000,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    handler: function (req, res, next) {
        const error = new Error("You sent too many requests. Please wait a while then try again");
        error.statusCode = 429;
        throw error;
    }
});
module.exports = limiter;
//# sourceMappingURL=secure.js.map