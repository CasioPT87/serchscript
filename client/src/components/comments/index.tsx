const React = require('react')
const CommentElement = require('./comment/index.tsx')

const Comments = ({ comments, articleId }: any) => {
  return (
    <div className="comments">
      <p className="comments__title">Don't be shy, leave us a comment</p>
      {comments.map((comment: any) => (
        <CommentElement key={comment._id} comment={comment} />
      ))}
      <CommentElement comment={null} articleId={articleId} />
    </div>
  )
}

module.exports = Comments
