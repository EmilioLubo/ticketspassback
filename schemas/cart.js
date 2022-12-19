const joi = require("joi");

const schema = joi.object({
  concertId: joi.any().required().messages({
    "any.required": "The field 'concertId' is required, please enter it",
  }),
  quantity: joi.number().integer().min(1).required().messages({
    "any.required": "The field 'quantity' is required, please enter it",
    "number.base": "The field 'quantity' must be a integer number, please change it",
    "number.empty": "The field 'quantity' mustn't be empty, please fill it",
    "number.min": "The field 'quantity' must be 1 or greater, please enter  a valid number"
  })  
});

module.exports = schema;
