const express = require("express")
const mongoose=require("mongoose")
const app = express()
const dotenv =require("dotenv")
const userRoute =require("./routes/user")
dotenv.config()
const authRoute = require("./routes/auth")
app.use(express.json())
mongoose.connect(process.env.mongodb).then(()=> console.log("db connected")).catch((err)=>{
    console.log(err)
})
app.use("/",authRoute)
app.use("/user",userRoute)


app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("runnig")
})