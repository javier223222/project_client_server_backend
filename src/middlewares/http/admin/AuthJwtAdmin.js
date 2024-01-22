const {getTokenDataAdmin}=require("../../../configs/jwt.config")

const verifyTokenAdmin=async(req,res,next)=>{
    try{
        const token=await getTokenDataAdmin(req.headers["x-access-token"])
        if(token){
          return  next()
        }
        return res.status(401).json({message:"Unauthorized"})
       
    }catch(err){
        return res.status(401).json({message:err.message})
    }
}

module.exports={
    verifyTokenAdmin
}