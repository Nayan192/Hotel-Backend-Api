const dotenv = require('dotenv');
const express=require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter=require('./routes/auth')
const usersRouter=require('./routes/users')
const hotelsRouter=require('./routes/hotels')
const roomsRouter=require('./routes/rooms')
dotenv.config()
const app=express()

const port=process.env.PORT||5000
mongoose.set("strictQuery", false);
const start=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database')
        } catch (error) {
        throw error
    }
}

//MiddleWares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/users",usersRouter)
app.use("/api/hotels",hotelsRouter)
app.use("/api/rooms",roomsRouter)

app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.message||"Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage
    })
})

app.listen(port,()=>{
    start()
    console.log(`Server is listening to ${port}...`)
})