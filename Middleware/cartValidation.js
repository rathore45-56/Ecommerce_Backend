const {body}=require('express-validator');
const addToCartValidation=[
    body("productId").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid product ID"),
    body("quantity").isInt({min : 1}).withMessage("Quantity must be positive and geater than equal to 1")
];
const updateCartValidation=[
    body("quantity").isInt({min:1}).withMessage("Quantity must be atleast 1")
];
module.exports=
{addToCartValidation,
    updateCartValidation
};