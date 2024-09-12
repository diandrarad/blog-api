const express = require('express')
const { getCommentsByPost, addComment, deleteComment } = require('../controllers/commentController')
const { protect, authorProtect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/post/:postId', getCommentsByPost)
router.post('/post/:postId', addComment)
router.delete('/:id', protect, authorProtect, deleteComment)

module.exports = router;
