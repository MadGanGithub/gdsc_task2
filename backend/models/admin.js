import mongoose from "mongoose";

const Schema=mongoose.Schema;

const adminSchema=new Schema({
    regno:{type:Number,unique:true},
    role:{type:String,default:"admin"},
    key:{type:String,required:true,unique:true},
    
},
{collection:'admin-data'}
);

export default mongoose.model("Admin",adminSchema)
