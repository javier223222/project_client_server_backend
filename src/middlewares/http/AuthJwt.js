const {getTokenData}=require("../../configs/jwt.config")

const verifyToken=async(req,res,next)=>{
    try{
        const token=await getTokenData(req.headers["x-access-token"])
        if(token){
          return  next()
        }
        return res.status(401).json({message:"Unauthorized"})
       
    }catch(err){
        return res.status(401).json({message:err.message})
    }
}

module.exports={
    verifyToken
}