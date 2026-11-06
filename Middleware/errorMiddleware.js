const CentralizedErrorHandling= async(req,resizeBy,next,err)=>
{
const statuscode= err.statuscode || err.status ||500;
res.status(statuscode).json({
    success:false,
    meesage: err.message || "Internal server Error"
});

};
module.exports= CentralizedErrorHandling;