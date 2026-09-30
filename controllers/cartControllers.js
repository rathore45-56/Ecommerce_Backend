const cart=require('../models/cart');
const Product=require('../models/Product')

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
        console.log("REQ.USER:", req.user);
console.log("USER ID:", req.user?._id);
console.log("BODY:", req.body);
        const userid=req.user._id;
        const{productId,quantity}=req.body;
        const product= await Product.findById(productId);
        if(!product)
            return res.status(400).json({message:"Product Not Found"});

        let Cart= await cart.findOne({user:userid});
        if(Cart)
        {
          const exist= await Cart.products.find(
            item=>item.product.toString===productId
          );
          if(exist)
          {
            exist.quantity+=quantity
          }
          else{
            Cart.products.push({product:productId,
                quantity:quantity});
          }
          Cart.totalcartprice= await caltotalprice(Cart.products);
        }
        else
        {
            Cart= new cart({
                user: userid,
                products:[{
                    product:productId,
                    quantity:quantity}],
                totalcartprice:product.price*quantity
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
    let Cart= await cart.findOne({user:userid});
    if(!Cart)
        return res.status(400).json({message:"Cart not Found"});
    const productexist=await Cart.products.find(
        item=>item.product.toString==productId
    );
    if(!productexist)
        return res.status(400).json({message:"Product Not in cart"});

    productexist.quantity=quantity;
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
         const productexist = Cart.products.find(
            item => item.product.toString() === productId
        );

        if (!productexist) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }
        Cart.products= Cart.products.filter(
            item=>item.product.toString!== productId
        );
        cart.totalcartprice= await caltotalprice(Cart.products);
        await cart.save();
        res.status(201).json({
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