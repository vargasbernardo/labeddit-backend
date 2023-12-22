import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`server running on port ${3003}`)
})

// app.use('/users', userRouter)