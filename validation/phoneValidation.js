const Joi = require('joi');

const validatePhone = (user) => {
    const schema = Joi.object({
        name: Joi.string().required() ,
        desc: Joi.string().min(20).required() ,
        numinstock: Joi.number().required() ,
        price: Joi.number().required() ,
    }).unknown();
        return schema.validate(user);
    }


module.exports =  validatePhone