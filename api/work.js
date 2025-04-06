const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const LogInCollection = require("./mongodb");
const hbs = require("hbs")
const port = process.env.PORT || 8000;


 // Connect to MongoDB

const mongoUri = process.env.MONGODB_URI; // Ensure this is set in your environment variables
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../templates"); // Views directory
const publicPath = path.join(__dirname, "../public")
console.log("Public Path:", publicPath);
console.log("Templates Path:", templatePath);

app.set("view engine", "hbs");
app.set("views", templatePath);

// Serve static files (CSS, JS, images)
app.use(express.static(publicPath));
app.get("/course", (req, res) => {
    res.render("course"); // Renders 'course.hbs' from the 'templates' folder
});
app.use(express.static(publicPath));
app.get("/SarthiAI", (req, res) => {
    res.render("SarthiAI"); // Renders 'course.hbs' from the 'templates' folder
});

app.use(express.static(publicPath));
app.get("/index", (req, res) => {
    res.render("index"); // Renders 'course.hbs' from the 'templates' folder
});

app.get('/progress', (req, res) => {
    res.render('progress'); // Renders progress.hbs
});

app.get('/peer', (req, res) => {
    res.render('peer');  // Renders peer.hbs
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };

        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking && checking.password === req.body.password) {
            return res.send("User details already exist");
        } else {
            await LogInCollection.insertMany([data]);
        }

        res.status(201).render("index", {
            naming: req.body.name
        });
    } catch (error) {
        console.error("Error occurred during signup:", error);
        res.send("Wrong inputs");
    }
});

app.get('/', (req, res) => {
    res.render('login', { errorMessage: null }); // Ensure no error message on initial load
});

app.use(express.static('public'));


app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("index", { naming: `${req.body.name}`, successMessage: "Login successful!" });
        } else {
            res.render("login", { errorMessage: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.render("login", { errorMessage: "Wrong details" });
    }
});



app.listen(port, () => {
    console.log('Port connected');
});
