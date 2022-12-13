import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { User } from "../database/models/User"
import { current_time } from "../utils/helperFunc"
import { user_schema } from "../utils/joi_schema"


//* Register User
exports.createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const time = current_time()
    const { fullname, email, password } = req.body;
    const { error, value } = user_schema.validate({ fullname, email, password })
    if(error){
      const new_error: any = new Error(
       `${error.message}`
      );
      new_error.statusCode = 400;
      throw new_error;
    }
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const error: any = new Error(
        "There is already a User with this email address"
      );
      error.statusCode = 409;
      throw error;
    } else {
      let user = await User.create({ fullname, email, password, created_At: time, updated_At: time })
      const token = jwt.sign(
        {
          person: {
            personId: user.id, 
            email: user.email,
            fullname: user.fullname,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const message = ["Registration successful"];
      res
        .status(201)
        .json({ status: true, message, data: { token: token } });
    }

  } catch (err: any) {
    if (err.name === "SequelizeValidationError" || err.name === "ValidationError") {
      let errors = [];
      const errs = err.errors;
      for (var key in errs) {
        errors.push(errs[key].message);
      }
      return res.status(400).json({ status: false, message: errors, data: {} });
    }
    next(err);
  }
};


//* Login User
exports.userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error: any = new Error(
        "No User found with this email"
      );
      error.statusCode = 404;
      throw error;
    } 
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const token = jwt.sign(
        {
          person: {
            personId: user.id,
            email: user.email,
            fullname: user.fullname,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const message = ["Login successful"];
      res.status(200).json({ status: true, message, data: { token: token } });
    } else {
      const error: any = new Error("The email address or password is incorrect");
      error.statusCode = 422;
      throw error;
    }

  } catch (err: any) {
    if (err.name === "SequelizeValidationError" || err.name === "ValidationError") {
      let errors = [];
      const errs = err.errors;
      for (var key in errs) {
        errors.push(errs[key].message);
      }
      return res.status(400).json({ status: false, message: errors, data: {} });
    }
    next(err);
  }
};