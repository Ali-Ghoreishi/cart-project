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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_db = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const connectionOption = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cart_db',
    port: 3306
};
const sequelize = new sequelize_1.Sequelize({
    database: connectionOption.database,
    username: connectionOption.user,
    password: connectionOption.password,
    host: connectionOption.host,
    port: connectionOption.port,
    dialect: "mysql",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.sequelize = sequelize;
const connect_db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log(`Connected to database: ${connectionOption.database}`);
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
exports.connect_db = connect_db;
//# sourceMappingURL=connection.js.map