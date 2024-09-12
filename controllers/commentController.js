const Comment = require('../models/Comment')

exports.getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
  res.json(comments)
}

exports.addComment = async (req, res) => {
  const { content, user } = req.body;
  try {
    const comment = await Comment.create({ content, user, post: req.params.postId })
    res.status(201).json(comment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
      await comment.remove()
      res.json({ message: 'Comment removed' })
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
