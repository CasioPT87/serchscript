//Import the mongoose module
var mongoose = require("mongoose");

const connectDb = async (req, res, next) => {
  //Set up default mongoose connection
  

  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  next();
};

module.exports = connectDb;
