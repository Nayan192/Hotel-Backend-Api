const User=require("../models/user")
const createError=require("../utils/error")
const bycrptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const register=async(req,res,next)=>{
    try {
        const salt=bycrptjs.genSaltSync(10)
        const hash=bycrptjs.hashSync(req.body.password,salt)
        const newUser =new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        await newUser.save()
        res.status(201).send("User created")
    } catch (error) {
        next(error)
    }
}
const login=async(req,res,next)=>{
    try {
        const user=await User.findOne({
            username:req.body.username
        })
        if(!user) return next(createError(404,"User not found!"))
        
        const checkPassword=await bycrptjs.compare(req.body.password,user.password)
        if(!checkPassword) return next(createError(401,"Wrong username or password"))
        
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)
        
        const {password,isAdmin,...otherdetails}=user._doc
        res.cookie("access_token",token,{
            httpOnly:true,
        })
        .status(200)
        .json({...otherdetails})
    } catch (error) {
        next(error)
    }
}

module.exports={
    register,
    login
}