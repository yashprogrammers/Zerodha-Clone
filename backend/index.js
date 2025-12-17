require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3002;
const URI = process.env.MONGO_URL;
const app = express();


app.listen(PORT, (req, res) => {
    console.log("App Started!")
    mongoose.connect(URI);
    console.log("DB Connected!");
})