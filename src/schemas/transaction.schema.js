import Joi from "joi";

export const transactionSchema = Joi.object({
    type: Joi.string().valid('entrada', 'saida').required(),
    value: Joi.number().positive().required(),
    description: Joi.string().required()
})