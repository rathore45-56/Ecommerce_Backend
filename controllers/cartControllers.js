const cart=require('../models/cart');
const Product=require('../models/Product')
const mongoose=require('mongoose');
//Helper function to calculate total price on each updation
const caltotalprice= async (products) => {
    let total=0;
    for(let item of products)
    {
        const product= await Product.findById(item.product);
        if(product)
        {
            total+=product.price*item.quantity;
        }
    }
    return total;
}


// create cart
const Addtocart= async (req,res) => {
    try{
       
        const userid=req.user._id;
        const{productId,quantity}=req.body;
        const quantityNumber=Number(quantity);
        if(quantity===undefined|| !Number.isInteger(quantityNumber) || quantityNumber<1)
        {
            return res.status(400).json({
        success:false,
    message:"Qunatity must be a positive integer"});
            }
      if(!mongoose.Types.ObjectId.isValid(productId))
      {
        return res.status(400).json({
            success:false,
            message:"Product ID must be valid"
        });
      }
      const product=await Product.findById(productId);
      if (!product) {
    return res.status(404).json({
        success: false,
        message: "Product Not Found"
    });
}
if(quantityNumber>product.stock)
{
 return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock"
    });
}

        let Cart= await cart.findOne({user:userid});
        if(Cart)
        {
          const exist= Cart.products.find(
            item=>item.product.toString===productId
          );
          if(exist)
          {
            const newquantity=exist.quantity+quantityNumber;
            if(newquantity>product.stock)
            {
                 return res.status(400).json({
            success: false,
            message: "Requested quantity exceeds available stock"
        });
            }
            exist.quantity=newquantity;
          }
          else{
            Cart.products.push({product:productId,
                quantity:quantityNumber});
          }
          Cart.totalcartprice= await caltotalprice(Cart.products);
        }
        else
        {
            Cart= new cart({
                user: userid,
                products:[{
                    product:productId,
                    quantity:quantityNumber}],
                totalcartprice:product.price*quantityNumber
            });

        }

        await Cart.save();
        res.status(201).json({
            sucess:true,
            message:"Cart Updated Successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
        success:false,
        message:`Internal Server Error ${err.message}`
        });
    }
}
// Get cart
const getcart= async(req,res)=>{
    try{
    const userID= req.user._id;
    const Cart= await cart.findOne({user:userID}).populate("products.product");
    if(Cart)
    {
      res.status(201).json({
        success:true,
        cart:Cart
      });
    }
    else
    {
        res.status(400).json({
            success:false,
            message:"Nothing in cart"
        })
    }
}
catch(err)
{
    res.status(500).json({
        success:false,
        message:`Interna Server Error ${err.message}`
    })
}
}
//Update cart
const updatecart=async(req,res)=>{
    try{
    const userid=req.user._id;
    const{productId,quantity}=req.body;
    const quantityNumber=Number(quantity);
     if(quantity===undefined|| !Number.isInteger(quantityNumber) || quantityNumber<1)
        {
            return res.status(400).json({
        success:false,
    message:"Qunatity must be a positive integer"});
            }
    let Cart= await cart.findOne({user:userid});
    if(!Cart)
        return res.status(400).json({message:"Cart not Found"});
    const productexist = Cart.products.find(
    item => item.product.toString() === productId
);
if(!productexist)
        return res.status(400).json({message:"Product Not in cart"});
    const product= await Product.findById(productId);
    if (!product) {
    return res.status(404).json({
        success: false,
        message: "Product Not Found"
    });
}
if(quantityNumber>product.stock)
{
     return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock"
    })
}
   

    productexist.quantity=quantityNumber;
    Cart.totalcartprice=await caltotalprice(Cart.products);
    await Cart.save();
    res.status(201).json({
        success:true,
        message:"cart updated successfully",
        cart:Cart
    })
}
catch(err)
{
    res.status(500).json({
    success:false,
    message:`Internal Server error ${err.message}`
    });
}
}
//Remove cart
const removecart= async (req,res) => {
    try{
        const userid=req.user._id;
        const productId= req.params.id;
        const Cart= await cart.findOne({user:userid});
        if(!Cart)
            return res.status(400).json({
        success:false,
        message:"Cart Not Found"
        });
         const productexist= Cart.products.find(
            item => item.product.toString() === productId
        );

        if (!productexist) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }
        Cart.products= Cart.products.filter(
            item=>item.product.toString()!== productId
        );
        Cart.totalcartprice= await caltotalprice(Cart.products);
        await Cart.save();
        res.status(200).json({
            success:true,
            message:"Cart removed successfully",
            cart:Cart
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}
module.exports={Addtocart,getcart,updatecart,removecart};