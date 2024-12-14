const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      
    },
    email: {
      type: String,
      
    },
    password: {
      type: String,
     
    },
    city: {
      type: String,
      
    },
    state: {
      type: String,
    },
    zipcode:{
      type:String,
    }

  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
