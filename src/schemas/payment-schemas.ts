import Joi from "joi";

export const paymentSchema = Joi.object({
  ticketId: Joi.number().positive().required,
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().min(15).max(16).required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().length(3).required()
  })
});
