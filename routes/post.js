const express = require("express")
const mongoose = require("mongoose")
const Image = mongoose.model("Image")
const router = express.Router()


router.post("/bookmarkimage",(req,res)=>{
    Image.findOne({imageUrl:req.body.imageUrl})
    .then(alreadyExist=>{
        if(alreadyExist){
            return res.status(422).json({error:"Image is already Bookmarked"})
        }
        else{
            const saveImage = new Image({
                imageUrl:req.body.imageUrl
            })
            saveImage.save()
            .then(result=>{
                return res.json({message:"Image bookmarked successfully",result:result})
            })
        }
    }).catch(err=>console.log(err))
})
router.get("/bookmarkedimage",(req,res)=>{
    Image.find()
    .then(result=>{
        res.json(result)
    })
})

module.exports=router