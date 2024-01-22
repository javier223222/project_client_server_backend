const { addMovie, getAllMovies } = require("../controllers/Movie.controller")
const { verifyToken } = require("../middlewares/http/AuthJwt")
const { verifyTokenAdmin } = require("../middlewares/http/admin/AuthJwtAdmin")

const router=require("express").Router()

router.post("/",verifyTokenAdmin,addMovie)
router.get("/",verifyToken,getAllMovies)
router.get("/admin",verifyTokenAdmin,getAllMovies)

module.exports=router