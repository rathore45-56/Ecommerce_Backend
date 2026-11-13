const CentralizedErrorHandling= (err,req,res,next)=>
{
    console.log(err)
const statuscode= err.statusCode ||500;
res.status(statuscode).json({
    success:false,
    message: err.message || "Internal server Error"
});

};
module.exports= CentralizedErrorHandling;
