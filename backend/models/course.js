import mongoose from "mongoose";

const Schema=mongoose.Schema;

const courseSchema=new Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    mode:{type:String,required:true},
    slots:{type:Number,required:true}
},
{collection:'course-data'}
);

export default mongoose.model("Course",courseSchema)
