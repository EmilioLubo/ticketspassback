const joi = require("joi");

const schema = joi.object({
  name: joi.string().required().messages({
    "any.required": "The field 'name' is required, please enter it",
    "string.empty": "The field 'name' mustn't be empty, please fill it",
    "string.base": "The field 'name' must be a string",
  }),
  photo: joi.string().uri().required().messages({
    "any.required": "The field 'photo' is required, please enter it",
    "string.empty": "The field 'photo' mustn't be empty, please fill it",
    "string.base": "The field 'photo' must be a string",
    "string.uri": "The field 'photo' must be an url",
  }),
  banner: joi.string().uri().required().messages({
    "any.required": "The field 'banner' is required, please enter it",
    "string.empty": "The field 'banner' mustn't be empty, please fill it",
    "string.base": "The field 'banner' must be a string",
    "string.uri": "The field 'banner' must be an url",
  }),
  youtubeVideo: joi.string().uri().messages({
    "any.required": "The field 'banner' is required, please enter it",
    "string.empty": "The field 'banner' mustn't be empty, please fill it",
    "string.base": "The field 'banner' must be a string",
    "string.uri": "The field 'banner' must be an url",
  }),
  artists: joi.array().items(joi.any()).required().messages({
    "any.required": "The field 'artists' is required, please enter it",
    "string.empty": "The field 'artists' mustn't be empty, please fill it",
    "array.base": "The field 'artists' must be an Array",
  }),
  date: joi.date().required().messages({
    "any.required": "The field 'Date' is required, please enter it",
    "date.base": "The field 'Date' must be a  valid date",
  }),
  description: joi.string().required().messages({
    "any.required": "The field 'description' is required, please enter it",
    "string.empty": "The field 'description' mustn't be empty, please fill it",
    "string.base": "The field 'description' must be a string",
  }),
  venue: joi.any().required().messages({
    "any.required": "The field 'Venue' is required, please enter it",
  }),
  type: joi.string().valid("concert", "festival").required().messages({
    "any.required": "The field 'type' is required, please enter it",
    "any.only": "The field 'type' must be a valid type: concert, festival",
    "string.empty": "The field 'type' mustn't be empty, please fill it",
    "string.base": "The field 'type' must be a string",
  }),
  category: joi.any().required().messages({
    "any.required": "The field 'category' is required, please enter it",
    "string.empty": "The field 'category' mustn't be empty, please fill it",
    "array.base": "The field 'category' must be an Array",
  }),
});

module.exports = schema;
