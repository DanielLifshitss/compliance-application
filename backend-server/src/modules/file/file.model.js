const mongoose = require('mongoose')


//File MongoDB Collection:
const fileSchema = new mongoose.Schema({
    filePath:String
})

module.exports = mongoose.model('File', fileSchema)