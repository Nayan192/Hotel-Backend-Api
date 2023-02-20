const Room=require("../models/Room")
const Hotel=require("../models/Hotel")
const createError=require("../utils/error")

const createRoom= async (req,res,next)=>{
    const hotelID=req.params.hotelid;
    const newRoom=new Room(req.body)
    try {
        const savedRoom=await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelID,{
                $push:{rooms:savedRoom._id}
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}
const updateRoom=async (req,res,next)=>{
    try {
        const updatedRoom=await Room.findByIdAndUpdate(
            req.params.id,
            { $set :req.body},
            {new:true})
        res.status(200).json(updatedRoom) 
    } catch (err) {
        next(err)
    }
}
const deleteRoom=async (req,res,next)=>{
    const hotelID=req.params.hotelid;
    try {
        const deleteRoom=await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelID,{
                $pull:{rooms:req.params.id}
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json({msg:"Room Deleted"}) 
    } catch (err) {
        next(err)
    }
}
const getSingleRoom=async (req,res,next)=>{
    try {
        const specificRoom=await Room.findById(req.params.id)
        res.status(200).json(specificRoom) 
    } catch (err) {
        next(err)
    }
}
const getAllRoom=async (req,res,next)=>{
    try {
        const allRooms=await Room.find()
        res.status(200).json(allRooms) 
    } catch (err) {
        next(err)
    }
}

module.exports={
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRoom,
    getSingleRoom
}