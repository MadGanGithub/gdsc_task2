import express from "express";
import userRoutes from "../backend/routes/userRoutes.js";
import adminRoutes from "../backend/routes/adminRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app=express();

//This converts request body to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//cookie parser(if not used,cookies will be undefined)
app.use(cookieParser())

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


//api routes
app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to gdsc"
    })
})
//User
app.use("/enter/",userRoutes)
//Admin
app.use("/enter/admin/",adminRoutes)

export default app;