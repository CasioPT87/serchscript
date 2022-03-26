const mongoose = require("mongoose");
const Article = require('./article')
const { Schema } = mongoose;

const schema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    hidden: Boolean,
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true
    }, 
  },
  { timestamps: true }
)

schema.pre('save', function(next) {
  const { article: articleId, _id } = this
  Article.findOneAndUpdate({ _id: articleId }, {
    $push: { comments: _id }
  }, { new: true })
    .then(() => {
      next()
    })
    .catch(e => {
    next(e)
  })
});

schema.pre('delete', function(next) {
  const { article: articleId, _id } = this
  Article.findOneAndUpdate({ _id: articleId }, {
    $pull: { comments: _id }
  }, { new: true })
    .then(() => {
      next()
    })
    .catch(e => {
    next(e)
  })
});

const CommentModel = mongoose.model(
  "Comment",
  schema
);

module.exports = CommentModel;