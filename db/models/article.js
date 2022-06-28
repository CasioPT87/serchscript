const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleModel = mongoose.model(
  "Article",
  Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      content: { type: String, required: true },
      hidden: Boolean,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      fecha: { type: Date },
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
