const React = require('react')
const Comment = require('./comment')

const Comments = ({ comments, articleId }) => {
  return (
    <div className="comments">
      <p className="comments__title">Don't be shy, leave us a comment</p>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
      <Comment comment={null} articleId={articleId} />
    </div>
  )
}

module.exports = Comments
