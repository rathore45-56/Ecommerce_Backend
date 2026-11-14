const express=require('express');
const router= express.Router();
const {protectedroute}= require('../Middleware/authmiddleware');
const {Addtocart,getcart,updatecart,removecart}=require('../controllers/cartControllers');
const {addToCartValidation,updateCartValidation}=require('../Middleware/cartValidation')
const validateRequest=require('../Middleware/validationMiddleware')

router.post('/addtocart',protectedroute,addToCartValidation,validateRequest,Addtocart);
router.get('/getcart',protectedroute,getcart);
router.put('/updatecart/:id',protectedroute,updateCartValidation,validateRequest,updatecart);
router.delete('/deletecart/:id',protectedroute,removecart);
module.exports=router;