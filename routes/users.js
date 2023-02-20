const router=require('express').Router();
const {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser
}=require("../controllers/user")

const {verifyAdmin,verifyUser}=require("../utils/verifyToken")

//UPDATE
router.put("/:id",verifyUser,updateUser)

//DELETE
router.delete("/:id",verifyUser,deleteUser)

//GET
router.get("/:id",verifyUser,getSingleUser)

//GET ALL
router.get("/",verifyAdmin,getAllUser)

module.exports=router