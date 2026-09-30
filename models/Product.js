const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const ProductModel=new Schema({
    title:
    {
        type:String,
        required:true,
        trim:true
    },
     price:
    {
        type:Number,
        required:true,
    },
     description:
    {
        type:String,
        required:true,
    },
     category:
    {
        type:String,
        required:true,
    },
     image:
    {
        type:String,
        default:""
    },
     brand:
    {
        type:String,
        default:""
    },
     stock:
    {
        type:Number,
        required:true,
        default:0
    },
     ratings:
    {
        type:Number,
        default:0
    },
    Reviews:
    {
        type:String,
        default:""
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    }

})
{
    timestamps:true
}
    const ProductSchema=model('Products',ProductModel);
    module.exports=ProductSchema;

