const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

async function dbFab() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbFab;
          
