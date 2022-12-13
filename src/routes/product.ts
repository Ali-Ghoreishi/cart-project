const { Router } = require('express');
const router = new Router()

const productController = require('../controllers/productController');

//*  @desc   Insert Product 
//*  @route  POST /product/insert
router.post("/insert" , productController.insertProduct)


module.exports = router
export {}
