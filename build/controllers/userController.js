"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const helperFunc_1 = require("../utils/helperFunc");
const joi_schema_1 = require("../utils/joi_schema");
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = (0, helperFunc_1.current_time)();
        const { fullname, email, password } = req.body;
        const { error, value } = joi_schema_1.user_schema.validate({ fullname, email, password });
        if (error) {
            const new_error = new Error(`${error.message}`);
            new_error.statusCode = 400;
            throw new_error;
        }
        const user = yield User_1.User.findOne({ where: { email: email } });
        if (user) {
            const error = new Error("There is already a User with this email address");
            error.statusCode = 409;
            throw error;
        }
        else {
            let user = yield User_1.User.create({ fullname, email, password, created_At: time, updated_At: time });
            const token = jsonwebtoken_1.default.sign({
                person: {
                    personId: user.id,
                    email: user.email,
                    fullname: user.fullname,
                },
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const message = ["Registration successful"];
            res
                .status(201)
                .json({ status: true, message, data: { token: token } });
        }
    }
    catch (err) {
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
});
exports.userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error("No User found with this email");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = yield bcryptjs_1.default.compare(password, user.password);
        if (isEqual) {
            const token = jsonwebtoken_1.default.sign({
                person: {
                    personId: user.id,
                    email: user.email,
                    fullname: user.fullname,
                },
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const message = ["Login successful"];
            res.status(200).json({ status: true, message, data: { token: token } });
        }
        else {
            const error = new Error("The email address or password is incorrect");
            error.statusCode = 422;
            throw error;
        }
    }
    catch (err) {
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
});
//# sourceMappingURL=userController.js.map