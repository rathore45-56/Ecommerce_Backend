const {Schema, model}=require('mongoose');
const mongoose=require('mongoose');
const Order= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"UserModel",
        required:true
    },
    orders:
    [
        {
            product:
            {
                  type:mongoose.Schema.Types.ObjectID,
        ref:"Products",
        required:true
            },
            quantity:
            {
                type:Number,
                required:true
            },
            price:
            {
                type:Number,
                required:true
            }
        }
    ],
    totalprice:
    {
        type:Number,
        required:true
    },
    shippingAddress:
    {
       type:String,
       required:true
    },
    paymentMethod:
    {
        type:String,
        default:"COD"
    },
    orderStatus:
    {
        type:String,
        default:"Pending"
    }
},
{
    timestamps:true
}

);
const OrderSchema= model('orders',Order);
module.exports=OrderSchema;