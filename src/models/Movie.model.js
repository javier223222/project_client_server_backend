const {createPool}=require("../configs/db.config")

class Movie{
    constructor(idmovie,titleMovie,descriptionMovie,year,timeduration,namegener,namedirector){
        this.idmovie = idmovie;
        this.titleMovie = titleMovie;
        this.descriptionMovie = descriptionMovie;
        this.year = year;
        this.timeduration = timeduration;
        this.namegener = namegener;
        this.namedirector = namedirector;

    }

   async saveMovie(pool){
      const [result] = await pool.execute(`insert into movie (titleMovie,descriptionMovie,year,timeduration) values (?,?,?,?)`,
      [this.titleMovie,this.descriptionMovie,this.year,this.timeduration])
      if(result.insertId==0){
        throw new Error("No se pudo guardar la pelicula")
    }
    this.idmovie=result.insertId
    console.log("d")
    await this.saveGener(pool)
    await this.saveDirector(pool)

    return this.idmovie



   }


   async saveGener(pool){
 
        await pool.execute(`insert into gener (idmovie,namegener) values (?,?)`,[this.idmovie,this.namegener])
        
    

   
    
   }

   

   async saveDirector(pool){
       
  
       await pool.execute(`insert into directors (idmovie,nameOfDirector) values (?,?)`,[this.idmovie,this.namedirector])
            
        
   }

   async getmovie(){
    const pool=await createPool()
    const [result]=await pool.query(`select mo.idmovie,mo.titleMovie,immo.urlMovie from movie mo inner join imagesofmovies
    immo on mo.idmovie=immo.idmovie and immo.typeImage=?`,["cartel"])
    return result
   }

   

   
   
}

module.exports=Movie