const mongoose = require('mongoose')
const { use } = require('passport')

const userSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String
}, { timestamps: true })

const userdb = new mongoose.model("users", userSchema)

module.exports = userdb;