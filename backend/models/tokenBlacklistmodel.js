const { default: mongoose } = require("mongoose");

const blackListSchema  = new mongoose.Schema({
  token : {
    type : String,
    required: [true, "Token string is required for blacklisting"],
    unique : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model("Token blackList", blackListSchema)