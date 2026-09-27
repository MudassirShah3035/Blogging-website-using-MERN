const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
  destination : (req, file, cb)=>{
    cb(null, path.join(__dirname, "../public"))
  },
  filename : (Req, file, cb)=>{
    cb(null , Date.now() +"-" + file.originalname)
  }
})

module.exports = multer({storage})