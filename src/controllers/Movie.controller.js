const { uploadImage } = require("../configs/cloundinary.config")
const { createPool } = require("../configs/db.config")
const Movie = require("../models/Movie.model")
const MovieMedia = require("../models/MovieMedia.model")
const fs=require("fs-extra")
const getMovies=async()=>{
 const media= new Movie(null,null,null,null,null,null,null)
 const res=await media.getmovie()
 return res
}

const getAllMovies=async(req,res)=>{
    try{
      const movies=await getMovies()
      res.status(200).json({
        movies
      })
    }catch(error){
     res.status(500).json({
        message:"Error al obtener las peliculaa"
     })
    }
}

const addMovie=async(req,res)=>{
    const pool=await createPool()
    try{
        await pool.beginTransaction()
       const {titleMovie,descriptionMovie,year,timeduration,namegener,namedirector}=req.body
    
       
      
       if(req.files?.imageMovie && req.files?.portimage){
       
        const movie=new Movie(null,titleMovie,descriptionMovie,new Date(year),parseInt(timeduration),namegener,namedirector)
        const id=await movie.saveMovie(pool)
       console.log(id)

        const oneImage=await uploadImage(req.files.imageMovie.tempFilePath)

        const saveOneIm=new MovieMedia(id,oneImage.secure_url,oneImage.public_id,"cartel",null)
        await saveOneIm.save(pool)
        const secondImage=await uploadImage(req.files.portimage.tempFilePath)
        const saveSeconIm=new MovieMedia(id,secondImage.secure_url,secondImage.public_id,"portada",null)
        await saveSeconIm.save(pool)

        await fs.unlink(req.files.imageMovie.tempFilePath)
        await fs.unlink(req.files.portimage.tempFilePath)
        
        await pool.commit()
        return res.status(201).json({
            message:"Pelicula agregada correctamente"
        })


       }
      

       return res.status(400).json({
        message:"Error al agregar pelicula"
       })
    
    }catch(error){
     
        await pool.rollback()
        return res.status(500).json({
           message:"Error al guardar la imagen",
           error
        })
    }
    

     



       
       
    
}
module.exports={
    getMovies,
    getAllMovies,
    addMovie
}