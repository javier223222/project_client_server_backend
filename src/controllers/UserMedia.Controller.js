const { uploadImage } = require("../configs/cloundinary.config")
const { getTokenData } = require("../configs/jwt.config")
const fs=require("fs-extra")
const UserMedia = require("../models/UserMedia.model")

let responseClients=[]
const getNewNotifications=async(req,res)=>{
  responseClients.push({res,iduser:req.query.id})
 
  
  req.on('close', () => {
    
     responseClients=responseClients.filter((x)=>x.iduser!=req.query.id);
  
})




}

const answerImage=(imagen,iduser)=>{
  
    console.log(responseClients)
    for (let index = 0; index < responseClients.length; index++) {
        let element = responseClients[index];
      
        if(element.iduser==iduser){
            element.res.status(200).json({
                success:true,
                imagen:imagen
           })

          
          
        }
        
        
    }

    responseClients=responseClients.filter((element)=>element.iduser!=iduser)
    

    
    

}

const uploadImageUser=async(req,res)=>{
    try{
        const token=await getTokenData(req.headers["x-access-token"])
        const {idUser}=token.data
        
        if(req.files?.profileImage){
         const imagen=await uploadImage(req.files.profileImage.tempFilePath)
         const userImage=new UserMedia(idUser,imagen.secure_url,imagen.public_id)
         await userImage.addMedia()
        answerImage(imagen.secure_url,idUser)
        await fs.unlink(req.files.profileImage.tempFilePath)
         return res.status(201).json({message:"Image uploaded successfully"})
        }

        return res.status(400).json({message:"Image not found"})


    }catch(e){
      return res.status(500).json({message:e.message})
    }
}


const getImagesUser=async(req,res)=>{
    try{
    if(req.query?.id){
      const id=req.query.id
      const userImage=new UserMedia(id,null,null)
      const image=await userImage.getMedia()
      if(image!=null){
           res.status(200).json({image})
      }else{
         res.status(404).json({message:"Image not found"})
      }
      
    }else{
        const token=await getTokenData(req.headers["x-access-token"])
        const {idUser}=token.data
        const userImage=new UserMedia(idUser,null,null)
        const image=await userImage.getMedia()
        if(image!=null){
            res.status(200).json({image})
        }else{
            res.status(404).json({message:"Image not found"})
        }
        
    }
    

   
    }catch(error){
         res.status(500).json({message:error.message})
    }
}

module.exports={
    uploadImageUser,
    getImagesUser,
    getNewNotifications
}