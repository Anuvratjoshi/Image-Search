const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    }
})
mongoose.model("Image",imageSchema)