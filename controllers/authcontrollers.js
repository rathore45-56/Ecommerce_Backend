const UserModel=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config();

const SignUp= async(req,res)=>{
    try{
    const{name,email,password}=req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({
           success:false,
           message:"All fields are mandatory" 
        });
    }
    const Userexist= await UserModel.findOne({email});
    if(Userexist)
    {
        return res.status(400).json({
            success:false,
            message:"User already exist in database"
        });
    }
    const salt= await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const newUser=new UserModel({name,email,password:hashedpassword});
    await newUser.save();
    if(newUser)
    {
        res.status(201).json({
           _id:newUser.id,
        name:newUser.name,
        email:newUser.email,
        token:generatetoken(newUser) 
        });
    }
    else
    {
       res.status(400).json(
        {
            message:"Invalid Credentials"
    });
    }
}
catch(err)
{
    res.status(500).json({
        success:false,
        message:`Internal server error ${err.message}`
    })
}
};
const SignIn= async(req,res)=>{
    try{
    const{email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"Provide all details"
        })
    }
    const FoundUser=await UserModel.findOne({email});

        if(FoundUser && await bcrypt.compare(password, FoundUser.password))
        {
            res.status(200).json({
        _id:FoundUser.id,
        name:FoundUser.name,
        email:FoundUser.email,
        token:generatetoken(FoundUser)
        })
    }
    else
    {
        res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        });

    }
}
catch(err)
{
    res.status.json({
        success:false,
        message:`Internal Server Error ${err.message}`
    })
}

};
const generatetoken= (user)=>{
    return jwt.sign({
          id: user._id,
          email:user.email,
          role:user.role
    },process.env.JWT_SECRET,
        {expiresIn: "25D",}
    )
};
module.exports={SignUp,SignIn};