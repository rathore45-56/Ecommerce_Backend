const ProductModel=require('../models/Product');
//create all products
const CreateProduct= async(req,res)=>{
    try{
         const { title, description, price, category, stock, image, brand } = req.body;
         const newProduct= new ProductModel({ title, description, price, category, stock, image, brand, user:req.user._id})
         await newProduct.save();

         res.status(201).json
         ({
            success:true,
            Product:newProduct
         })

    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

};
//Get all products
const getProduct= async(req,res)=>{
    try{
        const {search}= req.query;
        let filter={};
        if(search)
        {
            filter.title={
                $regex:search,
                $options:"i"
            };
        }
        const AllProducts=await ProductModel.find(filter);
        res.status(201).json({
            success:true,
            count:AllProducts.length,
            Products:AllProducts
        })
    }
    catch(err)
    {
         console.error("Get Products Error:", err);
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

};
//Get Single Product
const getSingleProductById= async(req,res)=>{
         try{
            const singleone=await ProductModel.findById(req.params.id);
            if(singleone)
            {
                res.status(201).json({
                    success:true,
                    Product:singleone
                });
            }
            else
                res.status(400).json({
            success:false,
            message:"Product Not Found"
        })
    }
        catch(err)
        {
           res.status(500).json({
            sucess:false,
            message:err.message
           })
        }
         
};
// Update the product
const UpdateProduct= async (req,res) => {
    try{
       
            const updatedproduct= await ProductModel.findByIdAndUpdate(
               req.params.id,
               req.body,
               {new:true}
            );
            if(!updatedproduct)
            {
                return res.json({
                    success:"false",
                    message:"Product Not Found"
                })
            }
            res.status(201).json({
                success:true,
                product:updatedproduct
            })
        }
      
    
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
};
// Delete Product
const deleteProduct= async (req,res) => {
    try{
        const product= await ProductModel.findByIdAndDelete(req.params.id);
        if(!Product)
        {
           return res.json({
            success:false,
            message:"Product Not Found"
           })
        }
        res.json({
            success:true,
            message:"Product Deleted Successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
};
module.exports={CreateProduct,getProduct,getSingleProductById,UpdateProduct,deleteProduct};
