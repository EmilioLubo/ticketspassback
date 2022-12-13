let joi = require('joi')

let schema = joi.object({
    name:joi.string().required().messages({"any.required":"name is required,please enter name","string.empty":"name can't be empty"}),
    address:joi.string().required().messages({"any.required":"address is required,please enter address","string.empty":"address can't be empty"}),
    capacity:joi.number().required().messages({"any.required":"capacity is required,please enter capacity","number.empty":"capacity can't be empty"}),
    type:joi.string().required().messages({"any.required":"type is required,please enter type","string.empty":"type can't be empty"}),
    location:joi.string(),
    country:joi.string().required().messages({"any.required":"country is required,please enter country","string.empty":"country can't be empty"}),
    city:joi.string().required().messages({"any.required":"city is required,please enter city","string.empty":"city can't be empty"})
})

module.exports = schema