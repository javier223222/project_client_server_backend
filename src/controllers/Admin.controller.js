const { getTokenAdmin } = require("../configs/jwt.config")
const Admin = require("../models/Admin.model")

const adminLogin=async(req,res)=>{
 try{
    const admin=new Admin(null,req.body.username,req.body.password)
    const  useAns=await admin.login()
    if(useAns!=null){
       
        const token=await getTokenAdmin(useAns)

        return res.status(200).json({
            success:true,
            message:"inicio de sesion de exitosos",
            token
        })
    }

    return res.status(400).json({
        success:false,
        message:"Username o password incorrectos"
    })
 }catch(error){
    return res.status(500).json({
        success:false,
        message:"Error al inciar sesion"
    })
 }
}


module.exports={adminLogin}