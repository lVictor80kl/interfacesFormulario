import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes"
import formRoutes from "./routes/formRoutes"
import colorRoutes from "./routes/colorRoutes"
import mediaRoutes from "./routes/mediaRoutes"
import cors from "cors"
import path from 'path';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.use("/auth",authRoutes)
app.use("/forms",formRoutes)
app.use('/pallettes',colorRoutes )
app.use("/media", mediaRoutes)

export default app