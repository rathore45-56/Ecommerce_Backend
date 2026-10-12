const cart = require('../models/cart');
const Order=require('../models/orders');
const Product=require('../models/Product');
//Calculte Price
const caltotalprice=async(products)=>{
       let total=0;
       for(let item of products)
       {
        const product= await Product.findById(item.product);
        if(product)
        total+=product.price*item.quantity;
       }
       return total;
};
// Place Order
const placeOrder=async(req,res)=>{
    const session=await require("mongoose").startSession();
    try{
    const userid=req.user._id;
    let newOrder;
    await session.withTransaction(async() => {
        //1. Find the user's cart
         const Cart= await cart.findOne({
        user:userid
    }).populate("products.product")
    .session(session);
   
   if(!Cart || Cart.products.length===0)
   {
    const err=new Error("Cart is Empty");
    err.statusCode=400;
    throw err;
   }
   // 2. Validate product existence and stock
   for(const item of Cart.products)
   {
    if(!item.product)
    {
         const err = new Error("Product not found");
                    err.statusCode = 400;
                    throw err;
    }
    if(!Number.isInteger(item.quantity) ||
                    item.quantity <= 0
    ) {
                            const err = new Error("Invalid product quantity");
                    err.statusCode = 400;
                    throw err;
                }
     if (item.product.stock < item.quantity) {
                    const err = new Error(
                        `Insufficient stock for ${item.product.title}`
                    );
                    err.statusCode = 400;
                    throw err;
                }
            
   }
   // 3.Deduct stock safely
   for(const item of Cart.products)
   {
    const updatedProduct= await Product.findByIdAndUpdate(
        {
            id:item.product._id,
            stock:{$gte: item.quantity}
        },
         {
            $inc:{stock: -item.quantity}
         },
         {
            new:true,
            session
         }
    );
    if(!updatedProduct)
    {
        const err = new Error(
                        `Insufficient stock for ${item.product.title}`
                    );
                    err.statusCode = 400;
                    throw err;
    }
   }
   // 4. Calculate total and prepare order items
   const orderItems=Cart.products.map(item=>({
    product:item.product._id,
    quantity:item.quantity,
    price:item.product.price
   }))
   const totalprice=orderItems.reduce(
    (total,item)=>
        total+item.price*item*quantity,
    0
   );
   // 5. Create Order
   const orders= await Order.create(
    [{
        user:userid,
        orders:orderItems,
        totalprice,
        shippingAddress: req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod
    }],
    {session}
   );
   newOrder=orders[0];
   //6. Clear cart after successfully order creation
   Cart.products=[];
   await Cart.save({session});
    });

        return res.status(201).json({
    success:true,
    message:"Order Placed Successfully",
    orders:newOrder
});
}
catch(err)
{
    console.error("Place Order Error",err);
    return res.status(err.statusCode || 500).json({
        success:false,
        message:`internal Server Error: ${err.statusCode}`
    });
}
finally{
    await session.endSession();
}
};
// Get all orders
const getOrders= async (req,res) => {
    try{
         const userId=req.user._id;
         const Orders= await Order.find({user:userId}).populate("orders.product");
         return res.status(200).json({
            success:true,
            orders:Orders});
    
}
catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Order
const getSingleOrder= async(req,res)=>{
    try{
       const singleOrder=await Order.findById(
        req.params.id
       ).populate("user").populate("orders.product");

              if (!singleOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order: singleOrder
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

};
// ALL Customer's orders and it is supervision by admin
const getallorders=async(req,res)=>{
    try{
        const Orders=await Order.find().populate("user","-password")
        .populate("orders.product");
        return res.status(200).json({
            success:true,
            orders:Orders
        });
    }
    catch (err) {

        console.error("Get All Orders Error", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    };
// Update Order status
const updateorderStatus=async(req,res)=>{
    try{
        const orderId= req.params.id;
        const {status}=req.body;
        const allowedStatuses=[
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ]
        // Validate status
        if(!allowedStatuses.includes(status))
        {
            return res.status(400).json({
                success:false,
                message:"Invalid order Status"
            });
        }
    
    // Find Order
    const order= await Order.findById(orderId);
    if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        order.orderStatus=status;
        await order.save();
        return res.status(200).json({
            success:true,
            message:"Order Updated Successfully",
            order:order

        });
    }
    catch (err) {

        console.error("Update Order Status Error", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    placeOrder,
    getOrders,
    getSingleOrder,
    getallorders,
    updateorderStatus
}

     