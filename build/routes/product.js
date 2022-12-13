"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router = new Router();
const productController = require('../controllers/productController');
router.post("/insert", productController.insertProduct);
module.exports = router;
//# sourceMappingURL=product.js.map