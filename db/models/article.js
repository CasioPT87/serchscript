const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
    date: { type: Date },
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
  this.titleId = paramCase(title)
}

ArticleSchema.plugin(mongoosePaginate)

const ArticleModel = mongoose.model('Article', Schema(ArticleSchema))

module.exports = ArticleModel
