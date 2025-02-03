import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes"
import formRoutes from "./routes/formRoutes"
dotenv.config()

const app = express()

app.use(express.json())

app.use("/auth",authRoutes)
app.use("/forms",formRoutes)

export default app