import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes"
import formRoutes from "./routes/formRoutes"
import colorRoutes from "./routes/colorRoutes"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth",authRoutes)
app.use("/forms",formRoutes)
app.use('/pallettes',colorRoutes )

export default app