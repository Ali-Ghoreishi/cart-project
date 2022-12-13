const { Router } = require('express');
const router = new Router()

import  { authenticated }  from '../middlewares/auth'

const cart_itemController = require('../controllers/cart_itemController');

//*  @desc   Add Product to Cart_item
//*  @route  POST /cart-item/add-product
router.post("/add-product" , authenticated, cart_itemController.add_product)


//*  @desc   Remove Product from Cart_item
//*  @route  POST /cart-item/remove-product
router.post("/remove-product" , authenticated, cart_itemController.remove_product)


//*  @desc   Update Product from Cart_item
//*  @route  POST /cart-item/update-product
router.post("/update-product" , authenticated, cart_itemController.update_product)

module.exports = router
export {}