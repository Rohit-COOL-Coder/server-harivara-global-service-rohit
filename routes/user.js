const routes=require("express").Router()
const { Router } = require("express")
const User=require('../models/User')

// ------------------adding new user 

routes.post('/addNewUser', async (req,res)=>{
   
    const newUser=new User(req.body)

    try{
        const data= await newUser.save()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
     
})

// -------------------getting all user

// routes.get('/getAllUser', async (req,res)=>{
//     try{
//      const data=await User.find()
//      res.status(200).json(data)
//     }catch(err){
//      res.status(500).json(err)
//     }
//  })

routes.get('/getAllUser', paginatedResults(), async (req,res)=>{
    res.json(res.paginatedResults);
})

function paginatedResults() {
    return async (req, res, next) => {
      
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const results = {};
  
      try {
        results.results = await User.find()
          .sort({ _id: 1 })
          .limit(limit)
          .skip(skipIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
    };
  }

//--------------------find user by id

routes.get('/find/:id', async(req,res)=>{

   try{
    const user=await User.findById(req.params.id)
    res.status(200).json(user)
   }catch(err){
     res.status(500).json(err)
   }
})

// ----------------------update user

routes.post('/updateUser/:id', async(req,res)=>{
    try{
        const data=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body   
           },{new:true})
        res.status(200).json(data)   
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=routes