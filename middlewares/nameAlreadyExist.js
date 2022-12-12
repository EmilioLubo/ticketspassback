const { nameAlreadyExistsResponse } = require("../config/responses")

const nameAlreadyExist = (model) => [
    async(req, res, next) => {
        let newName = req.body.name
        let item = await model.findOne({name: { $regex : newName, $options: 'i' }})
        item ?
        nameAlreadyExistsResponse(req, res) :
        next()
    }
]

module.exports = nameAlreadyExist