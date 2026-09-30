const {Schema,model}=require('mongoose');
const User= new Schema({
   name:
   {
    type:String,
    required:true
   },
   email:
   {
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   role:
   {
    type:String,
    enum:["user","admin"],
    default:"user"
   },
},
   {
      timestamps:true,
   }
);
   const UserModel=model('users',User);
   module.exports=UserModel; 


