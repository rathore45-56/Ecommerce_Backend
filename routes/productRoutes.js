const express=require('express');
const router=express.Router();
const {CreateProduct,getProduct,getSingleProductById,UpdateProduct,deleteProduct}=require('../controllers/ProductControllers');
const {protectedroute}=require('../Middleware/authmiddleware')
const {adminonly}=require('../Middleware/adminmiddleware')

router.post("/post",protectedroute,adminonly,CreateProduct);
router.get("/get",protectedroute,getProduct);
router.get("/getsingle/:id",protectedroute,getSingleProductById);
router.put("/update/:id",protectedroute,adminonly,UpdateProduct);
router.delete("/delete/:id",protectedroute,adminonly,deleteProduct);
module.exports=router;