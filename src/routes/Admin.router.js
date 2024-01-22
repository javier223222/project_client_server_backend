const { adminLogin } = require("../controllers/Admin.controller")

const router=require("express").Router()
router.post("/",adminLogin)

module.exports=router