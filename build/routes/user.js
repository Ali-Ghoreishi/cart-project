"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/userController');
router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
module.exports = router;
//# sourceMappingURL=user.js.map