const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://unicornofsky:0545355269@compliancecluster0.lcdrjdh.mongodb.net/?appName=ComplianceCluster0'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB