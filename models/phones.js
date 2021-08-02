const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phonePhoto: {
    type: String ,
  
} ,
  price: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative prices aren't real.");}
    },
    desc: {type: String,
        required: true,
    },
    category:{
        type: String,
    },
    numinstock:{type:Number, validate(value) {
        if (value < 0) {return "Out of stock"};
    }
  }, 
  user: { type: mongoose.Types.objectId},
  url: {type: String
},
});


const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
