const validator = (schema) => [
    (req, res, next) => {
        const data = schema.validate(req.body, { abortEarly: false });
        if (data.error) {
            return res.status(400).json({
                success: false,
                message: data.error.details,
            })
        }
        next();
    }
]

module.exports = validator;