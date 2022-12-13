import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from 'dotenv'
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import path from 'path';

import { connect_db } from './database/configs/connection';
import { sequelize } from './database/configs/connection';
import { errorHandler } from "./middlewares/errors";
import { setHeaders } from './middlewares/headers';


//* Load Config
dotenv.config({ path: __dirname + '/config/config.env' });


//* Database Connection
connect_db();


const app: Application = express()

//* Middlewares
app.use(cors())        //CORS enabled for All Routes
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10kb' }));
app.use(setHeaders)

//! Secure
//Helmet
app.use(helmet());

//Apply the rate limiting middleware to all requests
app.use(require('./middlewares/secure'))

//Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

//Data Sanitization against XSS attacks
app.use(xss())
//! End of Secure


//* Routes
app.use("/user" , require('./routes/user'));
app.use("/product" , require('./routes/product'));
app.use("/cart-item" , require('./routes/cart_item'));


//* Error Controller
app.use(errorHandler);


//* Server Connection
const PORT: any = process.env.PORT || 3050;
sequelize.sync().then((result: any) => {
    console.log("All models were synchronized successfully.");
    // console.log(result);
    app.listen(PORT, () => {
        console.log(`Server is Listening on: http://localhost:${PORT}/`)
    });
}).catch((error: any) => {
    console.error('Unable to synchronize models : ', error);
});


// export { app }