"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeaders = void 0;
const setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
};
exports.setHeaders = setHeaders;
//# sourceMappingURL=headers.js.map