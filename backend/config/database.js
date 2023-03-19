import mongoose from "mongoose";

const connectionDB=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(db_meth=>(
        console.log(`MongoDB database connected with the host: ${db_meth.connection.host}`)
    ))
}

export default connectionDB;