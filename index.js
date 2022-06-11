const express= require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require("cors")
const mongoose=require("mongoose")
const UserRouter=require("./routes/user")
dotenv.config()
app.use(express.json())
app.use(cors())

app.use('/api/users',UserRouter)


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("db connected")
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log('Server running ----5000---- :) ')
    })
}).catch((err)=>{
    console.log(err)
})


