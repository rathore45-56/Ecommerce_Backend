const express= require('express');
const router= express.Router();

const {placeOrder,getOrders,getSingleOrder,getallorders,updateorderStatus}=require('../controllers/orderControllers');

const {protectedroute}=require('../Middleware/authmiddleware');
const {adminonly}=require('../Middleware/adminmiddleware')

router.post('/createorder',protectedroute,placeOrder);
router.get('/getorders',protectedroute,getOrders);
router.get('/getsingleorder/:id',protectedroute,getSingleOrder);
router.put('/updatestatus:id',protectedroute,adminonly,updateorderStatus);
router.get('/getallorders',protectedroute,adminonly,getallorders);
module.exports=router;