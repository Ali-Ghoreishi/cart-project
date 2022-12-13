import { Request, Response, NextFunction } from "express";

import { Cart_item } from "../database/models/Cart_item"
import { Cart } from "../database/models/Cart"
import { check_user, check_product, current_time } from "../utils/helperFunc"


//* Add Product
exports.add_product = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const user_id = req.personId
    const time = current_time()
    const { product_id, quantity } = req.body;
    await check_user(user_id)
    const product = await check_product(product_id)
    const cart: any = await Cart.findOne({ where: { user_id: user_id, status: "unpaid" } })
    if (!cart) {
      let cart = await Cart.create({ user_id: user_id, created_At: time, updated_At: time })
      await Cart_item.create({ product_id, cart_id: cart.id, price: product.price, quantity, created_At: time, updated_At: time })
      const message = ["The product has been added to the cart"];
      res
        .status(201)
        .json({ status: true, message, data: {} });
    }
    
    await Cart_item.create({ product_id, cart_id: cart.id, price: product.price, quantity, created_At: time, updated_At: time })
    const message = ["The product has been added to the cart"];
    res
      .status(201)
      .json({ status: true, message, data: {} });

  } catch (err: any) {
    if (err.name === "SequelizeValidationError" || err.name === "ValidationError") {
      let errors: any = [];
      const errs = err.errors;
      for (var key in errs) {
        errors.push(errs[key].message);
      }
      return res.status(400).json({ status: false, message: errors, data: {} });
    }
    next(err);
  }
};


//* Remove Product
exports.remove_product = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const user_id = req.personId
    const { product_id } = req.body;
    await check_user(user_id)
    await check_product(product_id)
    const cart = await Cart.findOne({ where: { user_id: user_id, status: "unpaid" } })
    if (!cart) {
      const error: any = new Error(
        "The cart isn't exist"
      );
      error.statusCode = 404;
      throw error;
    }
    await Cart_item.destroy({
      where: {
        cart_id: cart.id,
        product_id: product_id
      }
    });
    const message = ["The product deleted"];
    res
      .status(200)
      .json({ status: true, message, data: {} });

  } catch (err) {
    next(err);
  }
}


//* Update Product
exports.update_product = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const user_id = req.personId
    const { product_id, quantity } = req.body;
    await check_user(user_id)
    await check_product(product_id)
    const cart = await Cart.findOne({ where: { user_id: user_id, status: "unpaid" } })
    if (!cart) {
      const error: any = new Error(
        "The cart isn't exist"
      );
      error.statusCode = 404;
      throw error;
    }
    const item = await Cart_item.findOne({ where: { cart_id: cart.id, product_id: product_id } })
    if (!item) {
      const error: any = new Error(
        "The product isn't exist"
      );
      error.statusCode = 404;
      throw error;
    }
    await Cart_item.update({ quantity: quantity }, {
      where: {
        cart_id: cart.id,
        product_id: product_id
      }
    });
    const message = ["The product updated"];
    res
      .status(200)
      .json({ status: true, message, data: {} });

  } catch (err) {
    next(err);
  }
} 