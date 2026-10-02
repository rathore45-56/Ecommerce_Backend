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
        const {search,category,minPrice,maxPrice}= req.query;
        //1. Search by product title
        let filter={};
        if(search)
        {
            filter.title={
                $regex:search,
                $options:"i"
            };
        }
        //2. Filter by category
        if(category)
        {
            filter.category=category;
        }
        //3. Filter By price range
        if(minPrice!==undefined || maxPrice!==undefined)
        {
             const priceFilter={};
             if(minPrice!==undefined)
             {
                const min= Number(minPrice);
                if(!Number.isFinite(min) || min<0)
                {
                    return res.status(400).json({
                        success:false,
                        message:"Invalid minimum Price"
                    });
                }
                priceFilter.$gte=min;
             }
             if(maxPrice!==undefined)
             {
                const max=Number(maxPrice);
                if(!Number.isFinite(max) || max<0)
                {
                    return res.status(400).json({
                        success:false,
                        message:"Invalid maximum price range"
                    })
                }
                priceFilter.$lte=max;
             }
            
             if(priceFilter.$gte!==undefined && priceFilter.$lte !==undefined && priceFilter.$gte>priceFilter.$lte)
             {
                return res.status(400).json({
                    success:false,
                    message:"Minimum price cannot exceed than maximum price"
                });
             }

             filter.price=priceFilter;
            }
        //4. Fetch filter products
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
