const joi = require('joi');

const schema = joi.object({
    serialNumber: joi
        .string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Serial number must be a string",
            "string.empty": "Serial number cannot be empty",
            "string.min": "Serial number must be at least 3 characters long",
            "string.max": "Serial number must be at most 50 characters long",
            "any.required": "Serial number is required"
        }),
    purchaseDate: joi
        .date()
        .required()
        .messages({
            "date.base": "Purchase date must be a date",
            "date.empty": "Purchase date cannot be empty",
            "any.required": "Purchase date is required"
        }),
    seat: joi
        .string()
        .min(3)
        .max(50)
        .messages({  
            "string.base": "Seat must be a string",
            "string.empty": "Seat cannot be empty",
            "string.min": "Seat must be at least 3 characters long",
            "string.max": "Seat must be at most 50 characters long"
        }),
    category: joi
        .string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Category must be a string",
            "string.empty": "Category cannot be empty",
            "string.min": "Category must be at least 3 characters long",
            "string.max": "Category must be at most 50 characters long",
            "any.required": "Category is required"
        }),
    userId: joi
        .string()
        .required()
        .messages({
            "string.base": "User ID must be a string",
            "string.empty": "User ID cannot be empty",
            "any.required": "User ID is required"
        }),
    concertId: joi
        .string()
        .required()
        .messages({
            "string.base": "Concert ID must be a string",
            "string.empty": "Concert ID cannot be empty",
            "any.required": "Concert ID is required"
        }),
    redeemed: joi
        .boolean()
        .required()
        .messages({
            "boolean.base": "Redeemed must be a boolean",
            "boolean.empty": "Redeemed cannot be empty",
            "any.required": "Redeemed is required"
        })
});

module.exports = schema;