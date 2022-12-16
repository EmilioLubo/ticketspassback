const { unauthorizedUserResponse } = require("../config/responses")

async function verifyRole(req, res, next) {
    req.user.role === 'admin' ?
    next() :
    unauthorizedUserResponse(req, res)
}

module.exports = verifyRole