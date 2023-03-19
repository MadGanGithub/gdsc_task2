import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const adminCheck=async(req,res,next)=>{
    
    const cookies=req.headers.cookie
    const token=cookies.split("=")[1]

    if(!token){
        return res.status(404).send({
            message:"Login first to access this resource"
        })
    }
    
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,found)=>{
        if(err){
            return res.status(400).json({message:"Invalid token"})
        }
        console.log(found)    
        req.regno=found.regno 
    });
    console.log(req.regno)
    const data=await Admin.findOne({regno:req.regno})
    console.log(data)
    const user=await Admin.findById(data.id)

    req.token=token
    req.user=user
    console.log(req.user.role)
    console.log("ggggg")
    next()
    console.log("after")

}

export default adminCheck;