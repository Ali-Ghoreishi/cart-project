import { Request, Response, NextFunction } from "express";

import { Product } from "../database/models/Product"
import { current_time } from "../utils/helperFunc"


 //* Insert Product
exports.insertProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const time = current_time()
    const { title, price, quantity } = req.body;
    const product = await Product.findOne({ where: { title: title } });
    if (product) {
      const error: any = new Error(
        "There is already a Product with this title"
      );
      error.statusCode = 409;
      throw error;
    } else {
      await Product.create({ title, price, quantity, created_At: time, updated_At: time })
      const message = ["Product insertion was successful"];
      res
        .status(201)
        .json({ status: true, message, data: {} });
    }
    
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
 
