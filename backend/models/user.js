import mongoose from "mongoose";

const Schema=mongoose.Schema;

const userSchema=new Schema({
    regno:{type:Number,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    course:{type:String}
},
{collection:'user-data'}
);

export default mongoose.model("User",userSchema)
