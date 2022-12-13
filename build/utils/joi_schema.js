"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_schema = void 0;
const joi_1 = __importDefault(require("joi"));
const user_schema = joi_1.default.object({
    fullname: joi_1.default.string()
        .alphanum()
        .min(4)
        .max(25)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
        .required()
}).
    options({ abortEarly: false });
exports.user_schema = user_schema;
//# sourceMappingURL=joi_schema.js.map