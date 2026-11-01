const mongoose=require('mongoose');
const connectDB= async()=>{
          
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("MongoDb Connected Successfully");
            console.log("Database Name:", mongoose.connection.name);
            console.log("Host Name:", mongoose.connection.host);


        })
        .catch((error)=>{
            console.log("MongoDb Connection Error:", error);
        });
    }
    module.exports= connectDB;
