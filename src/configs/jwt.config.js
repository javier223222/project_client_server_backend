const jwt=require("jsonwebtoken")
require("dotenv").config()
const getToken=async (payload)=>{
    return jwt.sign({
        data:payload
    },`${process.env.SECRET_NAME}`,{expiresIn:"24h"})
}

const getTokenData= async (token)=>{
    let data=null
    jwt.verify(token,`${process.env.SECRET_NAME}`,(err,decoded)=>{
        if(err){
            console.log("error al obtener el token")
        }else{
            data=decoded
        }
    })
    return data
}

const getTokenAdmin=async(payload)=>{
    return jwt.sign({
        data:payload
    },`${process.env.TOKEN_ADMIN_SECRET}`,{expiresIn:"24h"})
    
    
}
const getTokenDataAdmin=async(token)=>{
    let data=null
    jwt.verify(token,`${process.env.TOKEN_ADMIN_SECRET}`,(err,decoded)=>{
        if(err){
            console.log("error al obtener el token")
        }else{
            data=decoded
        }
    
    })

    return data
}


module.exports={
    getToken,
    getTokenData,
    getTokenAdmin,
    getTokenDataAdmin

}