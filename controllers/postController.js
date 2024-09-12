const Post = require('../models/Post')

exports.getPosts = async (req, res) => {
  const posts = await Post.find({ published: true }).populate('author', 'username')
  res.json(posts)
}

// Fetch all posts (both published and unpublished)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username')
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username')
  if (post && post.published) {
    res.json(post)
  } else {
    res.status(404).json({ message: 'Post not found' })
  }
}

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, author: req.user.id })
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id)
    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
      const updatedPost = await post.save()
      res.json(updatedPost)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post) {
      await Post.deleteOne( { _id: req.params.id } )
      res.json({ message: 'Post removed' })
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.publishPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post) {
      post.published = !post.published;
      const updatedPost = await post.save()
      res.json(updatedPost)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
