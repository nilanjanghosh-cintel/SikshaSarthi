const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://arko:arko@cluster0.cfvcc.mongodb.net/LoginFormPractice?retryWrites=true&w=majority";

// Connect to MongoDB
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

// Export the model
module.exports = LogInCollection;
