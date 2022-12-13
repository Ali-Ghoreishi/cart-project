"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router = new Router();
const auth_1 = require("../middlewares/auth");
const cart_itemController = require('../controllers/cart_itemController');
router.post("/add-product", auth_1.authenticated, cart_itemController.add_product);
router.post("/remove-product", auth_1.authenticated, cart_itemController.remove_product);
router.post("/update-product", auth_1.authenticated, cart_itemController.update_product);
module.exports = router;
//# sourceMappingURL=cart_item.js.map