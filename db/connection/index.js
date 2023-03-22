const mongoose = require('mongoose')
const { MONGODB_URI } = process.env

const connect = () => {
  console.log(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}`
  )
  const mongoDB =
    MONGODB_URI ||
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}`
  mongoose
    .connect(mongoDB)
    .then(() => console.log('connected to the db!!'))
    .catch(err => {
      console.log('Cannot connect to the database!', err)
    })
}

module.exports = connect
