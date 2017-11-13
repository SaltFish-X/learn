var marked = require('marked')
var Comment = require('../lib/mongo').Comment

// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
  afterFind (comments) {
    return comments.map(comment => {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  create (comment) {
    return Comment.create(comment).exec()
  },

  delCommentById (commentId, author) {
    return Comment.remove({ author, _id: commentId }).exec()
  },

  delCommentByPostId (postId) {
    return Comment({ postId }).exec()
  },

  getComments (postId) {
    return Comment
      .find({ postId })
      .populate({ path: 'author', model: 'User' })
  }
}

