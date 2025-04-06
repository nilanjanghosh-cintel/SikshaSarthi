const mongoose = require("mongoose");

// Use environment variable for security
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Mongoose connected");
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});

// Define schema
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model
const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
