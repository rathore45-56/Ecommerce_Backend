const { body }=require("express-validator");

const registerValidation=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Enter a valid email"),

    body("password")
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")


];
module.exports={ registerValidation };