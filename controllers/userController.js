const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password })
    res.status(201).json({ token: generateToken(user._id) })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}
