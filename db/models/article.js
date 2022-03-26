const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleModel = mongoose.model(
  "Article",
  mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      content: { type: String, required: true },
      hidden: Boolean,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        }
      ],      
    },
    { timestamps: true }
  )
);

module.exports = ArticleModel;
