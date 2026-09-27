const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
    trim : true
  },
  content : {
    type : String,
    required : true,
  },
  category :{
    type : String,
    required : true,
    enum : ["Technology","Lifestyle","Business","Design"]
  },
  coverImage:{
    type : String,
    default : ""
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model("posts", postSchema)