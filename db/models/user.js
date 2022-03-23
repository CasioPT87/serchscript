const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = mongoose.model(
  "User",
  mongoose.Schema(
    {
      name: String,
      description: String,
      published: Boolean,
      articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    },
    { timestamps: true }
  )
);

module.exports = UserModel;