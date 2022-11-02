const mongoose = require("mongoose");
const { MONGODB_URI } = process.env

const connect = () => {
    const mongoDB = MONGODB_URI || "mongodb://jamon:pass@mongodb:27017/cucarachas";
    mongoose
      .connect(mongoDB)
      // .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("connected to the db!!"))
      .catch((err) => {
        console.log("Cannot connect to the database!", err);
        // process.exit(); 
      });
}


module.exports = connect