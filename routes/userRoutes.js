const express=require('express');
const router=express.Router();
const {SignUp,SignIn}=require('../controllers/authcontrollers');
const {protectedroute}=require('../Middleware/authmiddleware');

router.post('/signup',SignUp);
router.post('/signIn',SignIn);
module.exports=router;
