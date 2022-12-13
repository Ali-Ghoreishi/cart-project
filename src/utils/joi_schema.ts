import Joi from 'joi';

const user_schema = Joi.object({
    fullname: Joi.string()
        .alphanum()
        .min(4)
        .max(25)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')) 
        .required()  
}).
options({ abortEarly: false })    // return all error


export { user_schema }