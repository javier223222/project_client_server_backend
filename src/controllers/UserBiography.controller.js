const { getTokenData } = require("../configs/jwt.config")
const UserBiography = require("../models/UserBiography.model")

let responseClients=[]

const getBiographyNew=async(req,res)=>{
  responseClients.push({res,iduser:req.query.id})
  
  req.on('close', () => {
    responseClients=responseClients.filter((x)=>x.iduser!=req.query.id)
  })


}

const answerBiography=(biography,iduser)=>{

  for (let index = 0; index < responseClients.length; index++) {
    let element = responseClients[index];
    if(element.iduser==iduser){
      element.res.status(200).json({
        success:true,
        biographyContent:{
          biographyContent:biography
        }
      })
     
    }
    
  }

  responseClients=responseClients.filter((x)=>x.iduser!=iduser)
}
const saveBio=async(req,res)=>{
    const token=await getTokenData(req.headers["x-access-token"])
    const {idUser}=token.data
    const {biography}=req.body
    try{
      const bio=new UserBiography(idUser,biography)
      const biographyContent=await bio.getBio()
      if(biographyContent!=null){
          await bio.update()
          answerBiography(biography,idUser)
          return res.status(200).json({message:"Biography updated successfully"})
      }
      
        await bio.save()
        answerBiography(biography,idUser)
        return res.status(201).json({message:"Biography saved successfully"})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getBio=async(req,res)=>{
  try{

    if(req.query?.id){
      const id=req.query.id
      const bio=new UserBiography(id,null)
      const biographyContent=await bio.getBio()
      if(biographyContent!=null){
          res.status(200).json({biographyContent})
      }else{
          res.status(404).json({message:"Biography not found"})
      }

    }else{
      const token=await getTokenData(req.headers["x-access-token"])
      const {idUser}=token.data
      const bio=new UserBiography(idUser,null)
      const biographyContent=await bio.getBio()
      res.status(200).json({biographyContent})
    }
   

  
    
  }catch(error){
        return res.status(500).json({message:error.message})
  }
}

module.exports={
    saveBio,
    getBio,
    getBiographyNew
}