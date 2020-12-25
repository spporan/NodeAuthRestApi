const router = require('express').Router();
const verifyToken=require('./varifyToken');


router.get('/',verifyToken,(req,res)=>{

    res.json({
        post:{
            title:"Created new post",
            description:"This is my first post......."
        }
    })
});









module.exports = router;