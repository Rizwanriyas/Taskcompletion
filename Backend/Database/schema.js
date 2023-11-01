const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    author:String,
})

const user = mongoose.model("data", UserSchema)
module.exports = user