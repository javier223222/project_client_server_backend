const { getToken } = require("../configs/jwt.config")
const UserAuth = require("../models/UserAuth.model")
const bcrypt=require("bcrypt")


const createUser=async (req,res)=>{
    try{
      const {username,email,password}=req.body
        let hashPassword= bcrypt.hashSync(password,10)

        const user=new UserAuth(null,username,email,hashPassword)

        await user.createUser()
      return  res.status(201).json({message:"User created"})
    }catch(err){
      return  res.status(500).json({message:err.message})
    }
}

const login=async(req,res)=>{
    try{
        const {usernamel,passwordl}=req.body
        console.log(usernamel,passwordl)
        const user=new UserAuth(null,usernamel,null,passwordl)
        const {idUser,username,email,password}=await user.login()

        if(!bcrypt.compareSync(passwordl,password)){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const token=await getToken({idUser,username,email})
       
        return res.status(200).json({message:"Login success",token})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports={
    createUser,
    login
}