const mongoose=require('mongoose');
const connectDB= async()=>{
    try{
          
        await mongoose.connect(process.env.MONGO_URI,{
        serverSelectionTimeoutMS: 60000,  
        });
        console.log("connected successfully");
    }
    catch (err)
    {
        console.error("Error in connecting with Databse", err);
        process.exit(1);

        
    }
}
    module.exports= connectDB;
