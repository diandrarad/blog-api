const express = require('express')
const { getPosts, getAllPosts, getPostById, createPost, updatePost, deletePost, publishPost } = require('../controllers/postController')
const { protect, authorProtect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', getPosts)
router.get('/all', protect, authorProtect, getAllPosts)
router.get('/:id', getPostById)
router.post('/', protect, authorProtect, createPost)
router.put('/:id', protect, authorProtect, updatePost)
router.delete('/:id', protect, authorProtect, deletePost)
router.put('/:id/publish', protect, authorProtect, publishPost)

module.exports = router;
