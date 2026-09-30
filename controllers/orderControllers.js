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
    try{
    const userid=req.user._id;
    const Cart= await cart.findOne({
        user:userid
    }).populate("products.product");
   if(!Cart || Cart.products.length===0)
   {
        return res.status(400).json({
            success:false,
            message:"Cart is Empty"});
   }
   const totalprice=await caltotalprice(Cart.products);

   const neworder= await Order.create({
    user:userid,
    orders:Cart.products.map(item=>({
             product:item.product,
             quantity:item.quantity,
             price:item.product.price
    })),
    totalprice : totalprice,
    shippingAddress: req.body.shippingAddress,
    paymentMethod:req.body.paymentMethod
});




Cart.products=[];
await Cart.save();

res.status(201).json({
    success:true,
    message:"Order Placed Successfully",
    orders:neworder
})
}
catch(err)
{
    console.error("Place Order Error",err);
    res.status(500).json({
        success:false,
        message:`internal Server Error: ${err.message}`
    })
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
    const order=Order.findById(orderId);
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

     