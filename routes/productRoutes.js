const express=require('express');
const router=express.Router();
const {CreateProduct,getProduct,getSingleProductById,UpdateProduct,deleteProduct}=require('../controllers/ProductControllers');
const {protectedroute}=require('../Middleware/authmiddleware')
const {adminonly}=require('../Middleware/adminmiddleware')
const {createProductValidation,updateProductValidation}=require('../Middleware/productValidation')
const validateRequest=require('../Middleware/validationMiddleware')

router.post("/post",protectedroute,adminonly,createProductValidation,validateRequest,CreateProduct);
router.get("/get",protectedroute,getProduct);
router.get("/getsingle/:id",protectedroute,getSingleProductById);
router.put("/update/:id",protectedroute,adminonly,updateProductValidation,validateRequest,UpdateProduct);
router.delete("/delete/:id",protectedroute,adminonly,deleteProduct);
module.exports=router;