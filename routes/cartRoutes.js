const express=require('express');
const router= express.Router();
const {protectedroute}= require('../Middleware/authmiddleware');
const {Addtocart,getcart,updatecart,removecart}=require('../controllers/cartControllers');

router.post('/addtocart',protectedroute,Addtocart);
router.get('/getcart',protectedroute,getcart);
router.put('/updatecart/:id',protectedroute,updatecart);
router.delete('/deletecart/:id',protectedroute,removecart);
module.exports=router;