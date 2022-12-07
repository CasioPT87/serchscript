const mongoose = require('mongoose')
const { paramCase } = require('param-case')
const { Schema } = mongoose

const ArticleSchema = Schema(
  {
    titleId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    hidden: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fecha: { type: Date },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
      },
    ],
  },
  { timestamps: true }
)

ArticleSchema.methods.setTitleId = function (title) {
  console.log({ hyphenate: paramCase(title) })
  this.titleId = paramCase(title)
}

const ArticleModel = mongoose.model('Article', Schema(ArticleSchema))

module.exports = ArticleModel
