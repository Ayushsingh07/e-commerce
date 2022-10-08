const jwt =require("jsonwebtoken")


const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token 
    if (authHeader){
        const token =authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if (err) res.status(403).json("token invalid")
            req.user=user
            next()
        })

    }else{
        return res.status(401).json("tou are not authenticated!! ")
    }
}
//req.user.id===req.params.id
const veryAndauth =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
        next()
        
        }else{
            res.status(403).json("npt allowed")

        }
    })
}

const veryAndadmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
        next();
        
        }else{
            res.status(403).json("not allowed to do this")

        }
    })
}

module.exports={verifyToken,veryAndauth,veryAndadmin}   