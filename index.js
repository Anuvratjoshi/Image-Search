const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8080
const mongoose = require("mongoose")

//model
require("./models/image")

app.use(express.json())
app.use(cors())


//route
app.use(require("./routes/post"))

mongoose.connect(process.env.MONG_URI)

mongoose.connection.on("connected",()=>{
    console.log("Connected with db")
})
mongoose.connection.on("error",()=>{
    console.log("Connection with db failed")
})

app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`)
})
