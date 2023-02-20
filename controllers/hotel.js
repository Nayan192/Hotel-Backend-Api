const Hotel=require("../models/Hotel")
const createHotel=async (req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel) 
    } catch (err) {
       next(err)
    }
}
const updateHotel=async (req,res,next)=>{
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set :req.body},
            {new:true})
        res.status(200).json(updatedHotel) 
    } catch (err) {
        next(err)
    }
}
const deleteHotel=async (req,res,next)=>{
    try {
        const deleteHotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"Hotel Deleted"}) 
    } catch (err) {
        next(err)
    }
}
const getSingleHotel=async (req,res,next)=>{
    try {
        const specificHotel=await Hotel.findById(req.params.id)
        res.status(200).json(specificHotel) 
    } catch (err) {
        next(err)
    }
}
const getAllHotel=async (req,res,next)=>{
    const {min,max,...others}=req.query
    try {
        const allHotels=await Hotel.find({...others,
        cheapestPrice:{$gt:min|1,$lt:max||999},
        }).limit(req.query.limit);
        res.status(200).json(allHotels) 
    } catch (err) {
        next(err)
    }
}

const countByCity=async (req,res,next)=>{
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        })) 
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

const countByType=async (req,res,next)=>{
    try {
        const apartmentList=await Hotel.countDocuments({type:"apartment"})
        const resortList=await Hotel.countDocuments({type:"resort"})
        const hotelList=await Hotel.countDocuments({type:"hotel"})
        const villaList=await Hotel.countDocuments({type:"villa"})
        const cabinList=await Hotel.countDocuments({type:"cabin"})
        
        res.status(200).json([
            {type:"hotel",count:hotelList},
            {type:"apartment",count:apartmentList},
            {type:"villa",count:villaList},
            {type:"cabin",count:cabinList},
            {type:"resort",count:resortList},
        ])
    
    } catch (err) {
        next(err)
    }
}

module.exports={
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotel,
    getSingleHotel,
    countByCity,
    countByType
}
