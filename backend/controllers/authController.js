const bcrypt = require("bcryptjs")
const userModel = require("../models/authModel.js")
const jwt  = require("jsonwebtoken")
const blackList = require("../models/tokenBlacklistmodel.js")

const signUp = async(req, res)=>{
  try {
    const {name, email, password} = req.body
    if(!name || !email || !password){
      return res.status(401).json({
        success : false,
        message : "Name, Email and Password is requied!"
      })
    }

    const existEmail = await userModel.findOne({email})
    if(existEmail){
      return res.status(401).json({
        success : false,
        message : "Email already exist"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name ,
      email,
      password : hashPassword
    })

    const token = jwt.sign(
      {userId : user._id}, 
      process.env.JWT_SECRET,
      {expiresIn : "90d"}
    )

    res.cookie("token", token, {
      httpOnly : true
    })

    return res.status(200).json({
      success : true,
      message : "User successfully sign up!",
      user
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const logIn = async(req, res)=>{
  try {
    const {email, password} = req.body
    if(!email || !password){
      return res.status(401).json({
        success : false,
        message : "Email and Password is requied!"
      })
    }

    const user = await userModel.findOne({email})
    if(!user){
      return res.status(401).json({
        success : false,
        message : "User does not exist"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({
        success : false,
        message : "Incorrect Password!"
      })
    }
    

    const token = jwt.sign(
      {userId : user._id}, 
      process.env.JWT_SECRET,
      {expiresIn : "90d"}
    )

    res.cookie("token", token, {
      httpOnly : true
    })

    return res.status(200).json({
      success : true,
      message : "User successfully sign up!",
      user
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const logOut = async(req, res)=>{
  try {
    const token = req.cookies.token
    if(token){
      await blackList.create({
        token
      })
    }

    res.clearCookie("token")

    return res.status(200).json({
      success: true,
      message: "User logged out successfully!"
    });
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const getLoginUser = async(req, res)=>{
  try {
    const id = req.user.userId
    if(!id){
      return res.status(400).json({
        success : false,
        message : "Id not found!"
      })
    }

    const user = await userModel.findById(id)
    if(!user){
      return res.status(400).json({
        success : false,
        message : "User not found!"
      })
    }

    
      return res.status(200).json({
        success : true,
        user
      })
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {signUp, logIn, logOut, getLoginUser}