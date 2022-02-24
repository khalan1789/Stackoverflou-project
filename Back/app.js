const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const topicRoutes = require("./routes/topic");
const messageRoutes = require("./routes/message");

// using .env
const dotenv = require("dotenv").config();
const url = process.env.URL_Path;

// connexion to MongoDB database
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connexion à la BDD MongoDB réussie !"))
    .catch(() => console.log("connexion à MongoDB échouée ... "));

// initializing express
const app = express();

// app.use((req, res) => {
//     res.json({ message: "ok express init !" });
// });

// CORS configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// parsing request to json
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/message", messageRoutes);

module.exports = app;
