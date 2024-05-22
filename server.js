const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'https://diandrarad-bookish-space-fishstick-94rgp9qjgwv377vr-3000.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// Middleware
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))