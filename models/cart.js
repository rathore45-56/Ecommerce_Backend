const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const cartschema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    products:[
        {
            product:
            {
               type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
            },
            quantity:
            {
              type:Number,
              required:true,
              default:1
            }
        }
    
       
    ],
    totalcartprice:
    {
        type:Number,
        default:0
    }
},
{
    timestamps:true
}
);
const Cart= model('cart',cartschema);
module.exports=Cart;