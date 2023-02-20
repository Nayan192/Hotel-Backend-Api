const router=require('express').Router();
const Room=require("../models/Room")
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRoom,
    getSingleRoom
}=require("../controllers/room")
const {verifyAdmin,verifyUser}=require("../utils/verifyToken")


//CREATE
router.post("/:hotelid",verifyAdmin,createRoom)

//UPDATE
router.put("/:id",verifyAdmin,updateRoom)

//DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

//GET
router.get("/:id",getSingleRoom)

//GET ALL
router.get("/",getAllRoom)


module.exports=router