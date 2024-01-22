const { createPool } = require("../configs/db.config");

class UserBiography {
    constructor(iduser,biography){
        this.iduser=iduser;
        this.biography=biography;
    }

    async save(){
        const pool=await createPool();
        await pool.execute("INSERT INTO biography(idUser,biographyContent) VALUES(?,?)",[this.iduser,this.biography]);

    }

    async update(){
        const pool=await createPool();
        await pool.execute("update biography set biographyContent=?,updated_at=? where idUser=? ",[this.biography,new Date(),this.iduser]);

    }
    async getBio(){
        const pool=await createPool();
        const [result]=await pool.query("select idbiography,idUser,biographyContent  from biography where idUser=?",[this.iduser]);
        if(result.length>0){
            return result[0];
        }
        return null;
    }


    
}

module.exports=UserBiography