const { saveBio, getBio, getBiographyNew } = require("../controllers/UserBiography.controller")
const {verifyToken}=require("../middlewares/http/AuthJwt")
const route=require("express").Router()

route
    .post("/",verifyToken,saveBio)
    .get("/",verifyToken,getBio)
    .get("/newBios",verifyToken,getBiographyNew)

module.exports=route