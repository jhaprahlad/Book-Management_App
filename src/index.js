const express = require("express");
const app = express();;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const routes = require("../src/routes/route.js");

app.use(express.json());

app.use("/", routes)

mongoose.connect(process.env.MONGODB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    })
    


app.listen(process.env.PORT, () => {
    console.log("Server is running at port no. ", process.env.PORT);
})
