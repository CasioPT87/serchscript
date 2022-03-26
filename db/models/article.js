const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleModel = mongoose.model(
  "Article",
  mongoose.Schema(
    {
      title: String,
      description: String,
      content: String,
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
