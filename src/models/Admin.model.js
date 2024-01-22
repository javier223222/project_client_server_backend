const { createPool } = require("../configs/db.config")

class Admin{
    constructor(idAdmin,username,password){
        this.idAdmin=idAdmin
        this.username=username
        this.password=password

    }

    async login(){
        const pool=await createPool()
        const [result]=await pool.query(`select idAdmin,username,password from admin where username=?`,[this.username])
        if(result.length==0){
            return null
        }
        if(result[0].password==this.password){
            return result[0]
        }else{
            return null
        }
    }
}

module.exports=Admin