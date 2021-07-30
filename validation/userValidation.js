const Joi = require("joi")
const validateUserSignup = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required() ,
        lastName: Joi.string().required() ,
        phoneNumber: Joi.number().min(11).required() ,
        email: Joi.string().required().email() ,
        password: Joi.string().min(10).required(),
        confirmPassword: Joi.string().min(10).required() 
    }).unknown();
        return schema.validate(user);
    }
    const validateUserSignin = (user) => {
        const schema = Joi.object({
            email: Joi.string().min(10).required().email() ,
            password: Joi.string().min(10).required() 
        }).unknown();
            return schema.validate(user);
        }
module.exports = {validateUserSignin, validateUserSignup};