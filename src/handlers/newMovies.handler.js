const {WebSocketServer,WebSocket}=require("ws")
const { getMovies } = require("../controllers/Movie.controller")
const ws1=new WebSocketServer({noServer:true})

ws1.on("connection",ws=>{
    console.log("cliente conectado")

    ws.send("hola cliente")

    ws.on("close",()=>{
        console.log("cliente desconectado")
    })
    ws.on("message",data=>{
        console.log("dato recibido",JSON.parse(data))
        // TODO Implemet controller for add movie
      
        ws1.clients.forEach(function each(client){
            if(client.readyState=WebSocket.OPEN){
              
              (async()=>{
                const movies=await getMovies()
                client.send(JSON.stringify(movies))
              })()
               
            }
        })
    })
})


module.exports=ws1