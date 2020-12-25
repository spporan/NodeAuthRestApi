
const jwt=require('jsonwebtoken');

 module.exports= function auth(req,res,next) {

    const token=req.header('auth_token');
    if(!token) return res.status(401).json({
        message:"Access denied."
    });

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECREATE);
        req.user=verified;
        next();

    }catch(error){
        res.status(400).json(
            {
                message:error
            }
        )
    }
    
}