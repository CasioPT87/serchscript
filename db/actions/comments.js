const Comment = require('../../db/models/comment')
const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId
const { escape } = require('validator')
const xssFilters = require('xss-filters')

// create new
const create = req => {
  const { content, hidden = false, articleId } = req.body
  if (content && articleId) {
    if (_.isBoolean(hidden) && ObjectId.isValid(articleId)) {
      const comment = new Comment()
      comment.content = xssFilters.inHTMLData(escape(content))
      comment.hidden = hidden
      comment.article = escape(articleId)
      return comment.save()
    }
    throw new Error('something wrong about this comment, man!')
  }
  throw new Error('article id and content are necessary to create a comment')
}

// delete all
// const destroyAll = () => {
//   return Comment.deleteMany({})
// }

// // get list of all
// const index = () => {
//   return Comment.find({})
// }

// // get comments for article
// const indexForArticle = async (req, res, next) => {
//   const { articleId } = req.params
//   return Article.findOne({ _id: articleId })
//     .populate('comments')
//     .select('comments')
// }

// // update comment
// const update = async (req, res, next) => {
//   const { content = null, hidden = false, articleId = null } = req.body

//   const comment = new Comment()
//   comment.content = content
//   comment.hidden = hidden
//   comment.article = articleId
//   return comment.save()
// }

// //deletes a comment by id
// const destroy = async (req, res, next) => {
//   const { id } = req.params
//   return Comment.findById(id).remove()
// }

module.exports = {
  create,
  // destroy,
  // destroyAll,
  // index,
  // indexForArticle,
  // update,
}
