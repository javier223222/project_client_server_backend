

const {createUser,login}=require("../controllers/UserAuth.controller")


const routerAuth=require("express").Router()
routerAuth
     .post("/",createUser)
     .post("/login",login)

module.exports=routerAuth     