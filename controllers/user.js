const User = require('../models/User');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs')
const accountVerificationEmail = require('./accountVerificationEmail');
const { userSignedUpResponse, userNotFoundResponse, invalidCredentialsResponse, userSignedOutResponse } = require('../config/responses');
const jwt = require('jsonwebtoken')


const controller = {

    register: async (req, res, next) => {
        let { name, lastName, photo, birthDate, email, password } = req.body;
        let role = 'user';
        let verified = false
        let logged = false
        let code = crypto.randomBytes(10).toString('hex');
        password = bcryptjs.hashSync(password, 10);
        try {
            await User.create({ name, lastName, role, photo, birthDate, email, password, code, verified, logged })
            await accountVerificationEmail(email, code)
            return userSignedUpResponse(req, res)
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    verify: async (req, res, next) => {
        const { code } = req.params;

        try {
            let user = await User.findOneAndUpdate({ code: code }, { verified: true }, { new: true })
            if (user) {
                return res.redirect('http://localhost:3000/')
            }
            return userNotFoundResponse(req, res)

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    login: async (req, res, next) => {
        let { password } = req.body;
        let { user } = req;
        try {
            const verifyPassword = bcryptjs.compareSync(password, user.password)
            if (verifyPassword) {
                const userDb = await User.findOneAndUpdate({ _id: user.id }, { logged: true }, { new: true })
                let token = jwt.sign(
                    {
                        id: userDb._id,
                        name: userDb.name,
                        lastName:userDb.lastName,
                        photo: userDb.photo,
                        logged: userDb.logged,
                        role: userDb.role,
                        birthDate: userDb.birthDate,
                        email: userDb.email
                    },
                    process.env.KEY_JWT,
                    { expiresIn: 60 * 60 * 24 }

                )

                return res.status(200).json({
                    response: { user, token },
                    success: true,
                    message: `Hello ${userDb.name}, welcome!`
                })
            }
            return invalidCredentialsResponse(req, res)
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    loginWithToken: async (req, res, next) => {

        let { user } = req;
        try {
            return res.json({
                response: {
                    user: {
                        id: user.id,
                        name: user.name,
                        photo: user.photo,
                        logged: user.logged,
                        lastName:user.lastName,
                        birthDate:user.birthDate,
                        email:user.email,
                        role: user.role,
                    },
                },
                success: true,
                message: `Welcome ${user.name}`
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    logout: async (req, res, next) => {
        const { id } = req.user;

        try {
            let user = await User.findOneAndUpdate(
                { _id: id },
                { logged: false },
                { new: true }
            );

            return userSignedOutResponse(req, res);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    readOne: async (req, res, next) => {
        let id = req.params.id;
        try {
            let user = await User.findById({ _id: id })
            if (user) {
                res.status(200).json({
                    success: true,
                    message: 'the user was found successfully!.',
                    data: user,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'the user was not found.',
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    update: async (req, res, next) => {
        let id = req.params.id;
        if (req.body.password) {
            let { password } = req.body;
            password = bcryptjs.hashSync(password, 10);
            req.body.password = password;
        }


        try {
            let user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });

            if (user) {
                res.status(200).json({
                    success: true,
                    message: "The user was successfully modified!",
                    data: user,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "The user was not found",
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

}

module.exports = controller;
