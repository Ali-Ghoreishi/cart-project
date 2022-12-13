"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res, next) {
    const status = error.statusCode || 500;
    const message = [];
    message.push(error.message);
    const data = error.data || {};
    res.status(status).json({ status: false, message, data });
}
exports.errorHandler = errorHandler;
;
//# sourceMappingURL=errors.js.map