const {createPool}=require("../configs/db.config")

class UserMedia{
    constructor(iduser,urlImage,urlID){
        this.iduser=iduser;
        this.urlImage=urlImage;
        this.urlID=urlID;
    }

    async addMedia(){
        const pool=await createPool()
        pool.connect()
        await pool.execute("INSERT INTO usermedia(idUser,urlImage,ulrID) values (?,?,?)",[this.iduser,this.urlImage,this.urlID])
        pool.end()
    }

    async getMedia(){
        const pool=await createPool()
        pool.connect()
        const [rows,fields]=await pool.query("SELECT idUserMedia,idUser,urlImage,ulrID,created_at FROM usermedia WHERE idUser=? order by created_at",[this.iduser])
        pool.end()
        if(rows.length>0){
            return rows[0]
        }
        return null
    }
}

module.exports=UserMedia