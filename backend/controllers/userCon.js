import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {comparePassword,hashed} from "../utils/authUtils.js";
import Course from "../models/course.js";
import cookieParser from "cookie-parser";

const signUp=async(req,res)=>{
    try{

        //hashed password
        const hashedPassword=await hashed(req.body.password,10)

        const user=await User.create({
            regno:req.body.regno,
            email:req.body.email,
            password:hashedPassword,
            course:""
        })

        res.json({status:"ok",message:"Signed up successfully"})
    }catch(err){
        res.json({
            success:false,
            message:"Error has occurred"
        })
    }
}


const signIn=async(req,res)=>{
    try{
        console.log(req.body)
        
        //regno check
        const found=await User.findOne({
            regno:req.body.regno,
            //saved regno:post regno
        })
        
        if(!found){
            return res.status(404).send({
                success:false,
                message:"Invalid regno"
            })
            
        }

        //password check
        const passwordUser=await User.findOne({
            regno:found.regno
        })
        
        //post password
        const pass=req.body.password
        //saved password
        const match=await comparePassword(pass,passwordUser.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }

        //Token creation
        const token=jwt.sign({
            regno:found.regno,
            password:found.password
        },process.env.JWT_SECRET_KEY)

        //Sends cookie
        res.cookie('jwt',token,{
            path:'/',
            expires:new Date(Date.now()+300000),
            httpOnly:true,
            sameSite:'lax'

        })
        //finally
        res.status(200).send({
            status:true,
            message:"Loggedin successfully",
        })
        
        
    }catch(err){
        console.log("Error in post api")
        res.status(500).send({
            success:false,
            message:"Error"
        })
    }
}


const getCourses=async(req,res)=>{

    try {
        const courses=await Course.find()

        res.status(200).send({
            success:true,
            courses
        })
    } catch (error) {
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
    
}

const applyCourse=async(req,res,next)=>{

    try{
        
        //find whether course present or not
        let find=await Course.findById(req.params.id)
        console.log("test1")
        if(!find){
            res.status(404).send({
                message:"No course found"
            })
        }
        console.log("test1")

        if(find.slots==0){
            res.status(404).send({
                message:"No more slots left"
            })
        }
        //Get user details
        const cookies=req.headers.cookie
        const token=cookies.split("=")[1]

        console.log("test1")
        if(!token){
            res.status(404).json({message:"Token not found"})
        }
        console.log("test2")
        jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,found)=>{
            if(err){
                return res.status(400).json({message:"Invalid token"})
            }

            req.regno=found.regno
        });
        console.log("test2")
        const data=await User.findOne({regno:req.regno})

        console.log("test2")

        const found_user=await User.findByIdAndUpdate(data.id,req.body,{
            new:true, 
            runValidators:true,
            useFindAndModify:false
        });
        console.log(find.id)
        console.log("test2")
        console.log(find.slots)
        const found_slot=await Course.updateOne({_id:find.id},{$set:{slots:find.slots-1}});

        
        console.log("test3")
        console.log(found_slot)
        console.log("test3")
        res.status(200).send({
            success:true,
            message:"updated successfully"
        })

    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal error"
        })
    }
    
}

const logOut=async(req,res,next)=>{
    res.clearCookie('jwt')

    res.status(200).send({
        success:true,
        message:"Logged-out"
    })
}

const registeredCourses=async(req,res,next)=>{

    const cookies=req.headers.cookie
    const token=cookies.split("=")[1]
  

    if(!token){
        res.status(404).json({message:"Token not found"})
    }

    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,found)=>{
        if(err){
            return res.status(400).json({message:"Invalid token"})
        }

        req.regno=found.regno
    });

    const data=await User.findOne({regno:req.regno})

    if(!data.course){
        return res.status(404).send({
            success:false,
            message:"No courses registered"
        })
    }else{
        const course=data.course
        return res.status(200).send({
            success:true,
            course
        })
    }
}

const oldLogOut=async(req,res,next)=>{
    res.clearCookie('admin')

    next()
}
const clearCookie=async(req,res,next)=>{
    res.clearCookie()

    next()
}

export {signUp,signIn,oldLogOut,clearCookie,getCourses,applyCourse,logOut,registeredCourses};