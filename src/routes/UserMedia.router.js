const { uploadImageUser, getImagesUser, getNewNotifications } = require("../controllers/UserMedia.Controller")
const { verifyToken } = require("../middlewares/http/AuthJwt")

const router=require("express").Router()


router
     .post("/",verifyToken,uploadImageUser)
     .get("/",verifyToken,getImagesUser)
     .get("/newMedia",verifyToken,getNewNotifications)


module.exports=router