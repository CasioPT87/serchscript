const mongoose = require('mongoose')
const { MONGODB_URI } = process.env

const connect = () => {
  const mongoDB =
    MONGODB_URI || 'mongodb://jamon:pass@localhost:27017/cucarachas'
  mongoose
    .connect(mongoDB)
    .then(() => console.log('connected to the db!!'))
    .catch(err => {
      console.log('Cannot connect to the database!', err)
    })
}

module.exports = connect
