const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentModel = mongoose.model(
  "Comment",
  mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
      },
      hidden: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = CommentModel;