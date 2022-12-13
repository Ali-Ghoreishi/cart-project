"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const connection_1 = require("./database/configs/connection");
const connection_2 = require("./database/configs/connection");
const errors_1 = require("./middlewares/errors");
const headers_1 = require("./middlewares/headers");
dotenv_1.default.config({ path: __dirname + '/config/config.env' });
(0, connection_1.connect_db)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: '10kb' }));
app.use(headers_1.setHeaders);
app.use((0, helmet_1.default)());
app.use(require('./middlewares/secure'));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, xss_clean_1.default)());
app.use("/user", require('./routes/user'));
app.use("/product", require('./routes/product'));
app.use("/cart-item", require('./routes/cart_item'));
app.use(errors_1.errorHandler);
const PORT = process.env.PORT || 3050;
connection_2.sequelize.sync().then((result) => {
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => {
        console.log(`Server is Listening on: http://localhost:${PORT}/`);
    });
}).catch((error) => {
    console.error('Unable to synchronize models : ', error);
});
//# sourceMappingURL=app.js.map