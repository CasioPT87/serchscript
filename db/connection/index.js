const mongoose = require("mongoose");
const { DATABASE_NAME } = process.env

const connect = () => {
    const mongoDB = `mongodb://jamon:pass@localhost:27017/${DATABASE_NAME}`;
    mongoose
      .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("connected to the db!!"))
      .catch((err) => {
        console.log("Cannot connect to the database!", err);
        // process.exit(); 
      });
}


module.exports = connect