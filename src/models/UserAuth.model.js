const { createPool } = require("../configs/db.config");

class UserAuth {
    constructor(id, username,email, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    async createUser(){
        
       const pool=await createPool()
       pool.connect()
       await pool.execute("INSERT INTO users(username,email,password) values (?,?,?)",[this.username,this.email,this.password])
       pool.end()

    
    }
    

    async login(){
        const pool=await createPool()
        pool.connect()
        const [rows,fields]=await pool.query("SELECT idUser,username,email,password FROM users WHERE username=?",[this.username,this.password])
        pool.end()
        console.log(rows)
        if(rows.length>0){
            return rows[0]
        }else{
           throw new Error("User not found")
        }
    }




    


}
module.exports = UserAuth;