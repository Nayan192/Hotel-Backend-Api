const User=require("../models/user")
const updateUser=async (req,res,next)=>{
    try {
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            { $set :req.body},
            {new:true})
        res.status(200).json(updatedUser) 
    } catch (err) {
        next(err)
    }
}
const deleteUser=async (req,res,next)=>{
    try {
        const deleteUser=await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"User Deleted"}) 
    } catch (err) {
        next(err)
    }
}
const getSingleUser=async (req,res,next)=>{
    try {
        const specificUser=await User.findById(req.params.id)
        res.status(200).json(specificUser) 
    } catch (err) {
        next(err)
    }
}
const getAllUser=async (req,res,next)=>{
    try {
        const allUsers=await User.find()
        res.status(200).json(allUsers) 
    } catch (err) {
        next(err)
    }
}

module.exports={
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser
}
