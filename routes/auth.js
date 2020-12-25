
const router=require('express').Router();
const { Mongoose } = require('mongoose');
const UserModel=require('../models/user');


router.post('/register/',async(req,res)=>{
   
    try{
        const user=new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

        const savedUser=await user.save();
        res.json(savedUser);
    }catch(error){
        res.status(400).json({
            message:error
        });
    }
    
});


router.get('/',async(req,res)=>{
    try{

        const users=await UserModel.find();
        res.json(users);

    }catch(error){
        res.status(400).json({
            message:error
        })
    }
});



module.exports=router;