const router=require('express').Router();
const Hotel=require("../models/Hotel")
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotel,
    getSingleHotel,countByCity, countByType
}=require("../controllers/hotel")
const {verifyAdmin,verifyUser}=require("../utils/verifyToken")


//CREATE
router.post("/",verifyAdmin,createHotel)

//UPDATE
router.put("/:id",verifyAdmin,updateHotel)

//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)

//GET
router.get("/find/:id",getSingleHotel)

//GET ALL
router.get("/",getAllHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)

module.exports=router