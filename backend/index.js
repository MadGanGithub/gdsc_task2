import app from "./app.js";
import dotenv from "dotenv";
import connectionDB from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//Basic settings
dotenv.config({path:'backend/config/config.env'});

//Mongodb connection
connectionDB()

//cors settings
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

//For parsing cookie 
app.use(cookieParser())

app.listen(process.env.PORT,()=>{
    console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
})