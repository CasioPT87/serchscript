const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentModel = mongoose.model(
  "Comment",
  mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      article: { type: Schema.Types.ObjectId, ref: 'Article' },
      edited: Boolean,
      hidden: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = CommentModel;