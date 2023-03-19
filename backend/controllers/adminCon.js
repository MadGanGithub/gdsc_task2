import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Course from "../models/course.js";
import {hashed,comparePassword} from "../utils/authUtils.js";
import User from "../models/user.js";

//Api to signup
const adminSignUp=async(req,res)=>{
    try{

        //hashed password
        const hashedKey=await hashed(req.body.key,10)
        console.log(hashedKey)
                try {
                    const admin=await Admin.create({
                        regno:req.body.regno,
                        key:hashedKey
                    })
                } catch (error) {
                    console.log(error)
                }
                
        res.json({status:"ok",message:"Signed up(Admin) successfully"})
    }catch(err){
        res.json({
            success:false,
            message:"Error has occurred"
        })
    }
}

//Api to signin
const adminSignIn=async(req,res)=>{
    try{
        
        console.log(req.body)
        
        //username check
        const found=await Admin.findOne({
            regno:req.body.regno
            //saved regno:post regno
        })
        
        
        
        if(!found){
            return res.status(404).send({
                success:false,
                message:"Invalid admin-id"
            })
            
        }
        const admin=await Admin.findOne({
            regno:found.regno
        })
        
        //Getting the admin details
        
        
        //post password
        const secret_key=req.body.key
        //saved password
        const match=await comparePassword(secret_key,admin.key)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid secret key"
            })
        }

        //Token creation
        const token=jwt.sign({
            regno:found.regno,
            key:found.key
        },process.env.JWT_SECRET_KEY)

        //Sends cookie
        res.cookie("admin",token,{
            path:'/',
            expires:new Date(Date.now()+3000000),
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

//Api to add a course
const addCourse=async(req,res,next)=>{
    try{
        const find=await Course.findOne({
            name:req.body.name
        })
    
        if(find){
            res.status(404).send({
                message:"Course is already present"
            })
        }

        //Main part
        try {
            await Course.create({
                name:req.body.name,
                description:req.body.description,
                mode:req.body.mode,
                slots:req.body.slots
            })
        } catch (error) {
            console.log(error)
        }
        
    
        res.status(200).send({
            success:true,
            message:"Course has been added successfully"
        })

    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal error"
        })
    }
    
}

//Api to delete a course
const deleteCourse=async(req,res,next)=>{

    try{
        const find=await Course.findById(req.params.id)
    
        if(!find){
            res.status(404).send({
                message:"No course found"
            })
        }

        //Main part
        await find.deleteOne()
        
    
        res.status(200).send({
            success:true,
            message:"Course has been deleted successfully"
        })

    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal error"
        })
    }
    
}

//Api to log out
const adminLogOut=async(req,res,next)=>{
    res.clearCookie('admin')

    res.status(200).send({
        success:true,
        message:"Logged-out"
    })
}
//Api to delete an user
const deleteUser=async(req,res,next)=>{

    try{
        const find=await User.findById(req.params.id)
    
        if(!find){
            res.status(404).send({
                message:"No user found"
            })
        }

        //Main part
        await find.deleteOne()
        
    
        res.status(200).send({
            success:true,
            message:"User has been deleted successfully"
        })

    }catch(err){
        res.status(500).send({
            success:false,
            message:"Internal error"
        })
    }


}

//Api to add an User
const addUser=async(req,res,next)=>{

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
const oldLogOut=async(req,res,next)=>{
    res.clearCookie('jwt')

    next()
}

const clearCookie=async(req,res,next)=>{
    res.clearCookie()

    next()
}


export {adminSignUp,oldLogOut,clearCookie,adminSignIn,addCourse,deleteCourse,adminLogOut,deleteUser,addUser};