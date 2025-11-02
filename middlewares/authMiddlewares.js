const jwt = require('jsonwebtoken');
const userModel=require("../models/userSchema")

const requireAuthUser = (req, res, next) => {

    const token=req.cookies.jwt;
if(token){
    jwt.verify(token,"",async(err,decodedToken)=>{
        if(err){
            res.status(401).json({ message: 'Token invalide ' })
        }
        const user=await userModel.find(decodedToken.id);
        if(user){
            req.user=user;
            next();
        }else{
            res.status(401).json({message:'Unauthorized'})
        }
    })
}

};

