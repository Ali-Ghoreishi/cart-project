"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const error = new Error("You don't have permission");
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            const error = new Error("You don't have permission");
            error.statusCode = 401;
            throw error;
        }
        req.personId = decodedToken.person.personId;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticated = authenticated;
//# sourceMappingURL=auth.js.map