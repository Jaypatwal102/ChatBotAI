"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        }
        catch (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors,
            });
        }
    };
};
exports.validate = validate;
