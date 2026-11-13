const express=require('express');
const router=express.Router();
const {SignUp,SignIn}=require('../controllers/authcontrollers');
const {protectedroute}=require('../Middleware/authmiddleware');
const {registerValidation}=require('../Middleware/authValidation');
const validateRequest=require('../Middleware/validationMiddleware');


router.post('/signup',registerValidation,validateRequest,SignUp);
router.post('/signIn',SignIn);
module.exports=router;
