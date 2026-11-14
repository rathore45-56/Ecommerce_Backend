const {body}=require('express-validator');
const createProductValidation=[
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("price").isFloat({gt:0}).withMessage("Price must be greater than zero"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("stock").isInt({min:0}).withMessage("Stock must be a positive number")
];
const updateProductValidation = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("price")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than zero"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product description cannot be empty"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer")
];

module.exports = {
    createProductValidation,
    updateProductValidation
};
