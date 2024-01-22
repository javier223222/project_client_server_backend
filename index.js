const express=require("express")
const cors=require("cors")
const {createServer}=require("http")
const jwt=require("jsonwebtoken")
const {parse}=require("url")
const ws1=require("./src/handlers/newMovies.handler")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")
const {Server}=require("socket.io")

dotenv.config()

const app=express()

const httpServer=createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:3301"
    },
    pingInterval: 1000,
    pingTimeout: 2000
});


const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads"
}))
app.use("/auth",require("./src/routes/UserAuth.router"))
app.use("/profile/bio",require("./src/routes/UserBiography.router"))
app.use("/profile/media",require("./src/routes/UserMedia.router"))
app.use("/movies",require("./src/routes/Movie.router"))
app.use("/admin",require("./src/routes/Admin.router"))
app.get("/",(req,res)=>{
    res.send("<h1>Welcome rest api</h1>")
})

httpServer.on("upgrade",function upgrade(request, socket, head){
    const {pathname}=parse(request.url)
    if(pathname=='/moviesPrincipal'){
        

        jwt.verify(request.headers["x-access-token"]||request.headers["x-access-token-admin"],`${request.headers["x-access-token-admin"]?process.env.TOKEN_ADMIN_SECRET:process.env.SECRET_NAME}`,(err,decoded)=>{
            if(err){
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
             socket.destroy();
              return;
            }
           
            ws1.handleUpgrade(request,socket,head,(ws)=>{
                ws1.emit('connection',ws,request)
              })  

        })

        
    }
})
httpServer.listen(PORT)
