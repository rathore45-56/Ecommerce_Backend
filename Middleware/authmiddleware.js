const jwt=require('jsonwebtoken');
const UserModel=require('../models/User');
 const protectedroute=async(req,res,next)=>{
       let token;
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
       {
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded= jwt.verify(token,process.env.JWT_SECRET);
            user=await UserModel.findById(decoded.id).select('-password')//Because we don't display password;
            if(!user)
            return res.status(401).json({
        success:false,
        message:"User Not Found"
        })
           req.user=user;
            next();
        }
        catch(err)
        {
            console.log("Error");
            res.status(401)
            throw new Error("Not Authorized");
        }
       }
       
 };
 module.exports={protectedroute}