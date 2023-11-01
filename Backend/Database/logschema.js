const mongoose = require("mongoose")

const logSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})
const client = mongoose.model("client",logSchema)
module.exports = client