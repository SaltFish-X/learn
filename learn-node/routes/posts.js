var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin
var PostModel = require('../models/posts')
var CommentModel = require('../models/comments')

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  var author = req.query.author

  PostModel.getPosts(author)
    .then(posts => {
      res.render('posts', { posts })
    })
    .catch(next)
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, function (req, res, next) {
  var author = req.session.user._id
  var title = req.fields.title
  var content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    } else if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = { author, title, content, pv: 0 }
  console.info(post)
  PostModel.create(post)
    .then(function (result) {
      post = result.ops[0]

      req.flash('success')
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  var postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId),
    CommentModel.getComments(postId)
  ])
    .then(function (result) {
      var post = result[0]
      var comments = result[2]
      if (!post) {
        throw new Error('The post not exist')
      }
      res.render('post', { post, comments })
    })
    .catch(next)
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  var postId = req.params.postId
  var author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('该文章不存在');
      } else if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足');
      }
      res.render('edit', { post })
    })
    .catch(next)
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;

  PostModel.updatePostById(postId, author, { title, content })
    .then(function () {
      req.flash('success', '编辑文章成功')
      res.redirect(`/posts/${postId}`)  // 编辑成功后跳转到上一页
    })
    .catch(next)
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  PostModel.delPostById(postId, author)
    .then(function () {
      req.flash('success', '删除文章成功');
      res.redirect('/posts');   // 删除成功后跳转到主页
    })
    .catch(next)
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function (req, res, next) {
  var author = req.session.user._id
  var postId = req.params.postId
  var content = req.fields.content

  var comment = { author, postId, content }

  CommentModel.create(comment)
    .then(_ => {
      req.flash('sucess', '发布成功')
      res.redirect('back')
    })
    .catch(next)
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function (req, res, next) {
  var commentId = req.params.commentId
  var author = req.session.user._id

  CommentModel.delCommentById(commentId, author)
    .then(_ => {
      req.flash('sucess')
      res.redirect('back', '删除成功')
    })
    .catch(next)
});

module.exports = router;