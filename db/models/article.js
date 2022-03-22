const mongoose = require("mongoose");

const ArticleModel = mongoose.model(
  "article",
  mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = ArticleModel;
