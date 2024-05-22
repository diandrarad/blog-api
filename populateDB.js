const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Post = require('./models/Post')
const Comment = require('./models/Comment')

dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"))

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// Clear the database
const clearDB = async () => {
  await User.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})
}

const createInitialData = async () => {
    // Create users
    const users = [
      {
        username: 'author1',
        email: 'author1@example.com',
        password: await hashPassword('password'),
        role: 'author',
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: await hashPassword('password'),
        role: 'user',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: await hashPassword('password'),
        role: 'user',
      },
    ];
  
    const createdUsers = await User.insertMany(users)
    const author = createdUsers.find(user => user.role === 'author')
  
    // Create posts
    const posts = [
      {
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: author._id,
        published: true,
      },
      {
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: author._id,
        published: false,
      },
    ];
  
    const createdPosts = await Post.insertMany(posts)
  
    // Create comments
    const comments = [
      {
        post: createdPosts[0]._id,
        user: 'user1',
        content: 'This is a comment by user1.',
      },
      {
        post: createdPosts[0]._id,
        user: 'user2',
        content: 'This is a comment by user2.',
      },
    ];
  
    await Comment.insertMany(comments)
}

const populateDB = async () => {
try {
    await clearDB()
    await createInitialData()
    console.log('Database populated!')
    process.exit()
} catch (err) {
    console.error(err)
    process.exit(1)
}
}

populateDB()  