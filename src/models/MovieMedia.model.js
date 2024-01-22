class MovieMedia {
    constructor(idmovie,urlImage,publicUrl,type,idimagen){
        this.idmovie = idmovie;
        this.urlImage = urlImage;
        this.publicUrl = publicUrl;
        this.type=type;
        this.idimagen=idimagen
    }

    async save(pool){
           const [result]=await pool.execute(`insert into imagesofmovies(idmovie,urlMovie,public_id,typeImage)
           values(?,?,?,?)`,[this.idmovie,this.urlImage,this.publicUrl,this.type])

           if(result.insertId=0){
            throw new Error("no se puedo guardar la imagen de la peliculas")
           }
           this.idimagen=result.insertId
           return this.idimagen
    }




}

module.exports=MovieMedia