const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_id:{
        type : String
    },
    name:{
        type : String
    },
    email:{
        type : String
    },
    password:{
        type : String
    },
    role:{
        type : String
    }
    
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
