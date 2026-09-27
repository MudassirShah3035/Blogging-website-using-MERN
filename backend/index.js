require("dotenv").config()
const express = require("express")
const dns = require("dns")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
const authRouter = require("./routes/authRoute")
const postRoute = require("./routes/postRoute")

dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))

const PORT = process.env.PORT || 7000

app.get('/',(req, res)=>{
  res.send("Mudassir Shah")
})

app.use('/api/auth', authRouter)
app.use('/api/posts', postRoute)

app.listen(PORT, ()=>{
  console.log(`Server runs at http://localhost:${PORT}`)
  connectDB()
})