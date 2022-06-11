const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
  
    img:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true}

},{timestamps:true})

module.exports=mongoose.model("Users",UserSchema)