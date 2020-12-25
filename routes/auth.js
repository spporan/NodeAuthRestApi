
const router = require('express').Router();
const { Mongoose } = require('mongoose');
const bcrypt=require('bcryptjs');

const UserModel = require('../models/user');
const validation=require('../validation')
const webToken=require('jsonwebtoken');



//create user 
router.post('/register', async (req, res) => {


    //validate user

    const {error}= validation.registrationValidation(req.body);

    if(error) return res.status(400).json({
        message:error.details[0].message
    });

    try {

        //check user is exist or not

        const existUser= await UserModel.findOne({email:req.body.email});

        if(existUser) return res.status(400).json({
            message:"User already exist."
        });

        //create HASH password
        const hashSolt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,hashSolt);

        //create user
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        const savedUser = await user.save();

        //send response
        res.json({
            userId:savedUser.id
        });

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }

});


//login user
router.post('/login',async (req,res)=>{
    //validate user
    const {error} = validation.loginValidation(req.body)
    if(error) return res.json({
        message:error.details[0].message
    });

    //check user is valid or not
    const userExist=await UserModel.findOne({email:req.body.email});
    if(!userExist) return res.status(400).json({
        message:"User doesn't exist."
    });

    const validPass=await bcrypt.compare(req.body.password,userExist.password);
    if(!validPass) return res.status(400).json({
        message:"Invalid password."
    })

    //create and assign web token

    const token=webToken.sign({_id:userExist._id},process.env.TOKEN_SECREATE)

    //login success
    res.status(200).header({auth_token:token}).json({
        token:token,
        status:"Logged in success",
        user:{
            name:userExist.name,
            email:userExist.email,
            createdDate:userExist.createdDate
        }
    })

   
});


router.get('/', async (req, res) => {
    try {

        const users = await UserModel.find();
        res.json(users);

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
});



module.exports = router;