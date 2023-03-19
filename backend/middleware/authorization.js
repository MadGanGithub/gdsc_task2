
const authorizeRoles=(roles)=>{
    return (req,res,next)=>{
        console.log("shit")
        if(req.user.role!=roles){
            
            return next(res.status(404).send({
                
                messsage:`${req.user.role} cant access this page`
            }))
        }else{
            console.log("Valid")
            return next()
        }
    }

}
export default authorizeRoles;