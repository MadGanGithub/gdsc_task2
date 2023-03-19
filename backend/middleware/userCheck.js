import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userCheck=async(req,res,next)=>{

    //Get token
    const cookies=req.headers.cookie
    const token=cookies.split("=")[1]

    if(!token){
        return res.status(404).send({
            message:"Login first to access this resource"
        })
    }

    //Verify token
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,found)=>{
        if(err){
            return res.status(400).json({message:"Invalid token"})
        }

        req.regno=found.regno
    });
    
    const data=await User.findOne({regno:req.regno})
    const user=await User.findById(data.id)

    req.token=token
    req.user=user
    next()
}

export default userCheck;