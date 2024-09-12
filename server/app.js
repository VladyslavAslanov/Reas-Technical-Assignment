const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const leadRoutes = require("./routes/leadRoutes")
require("dotenv").config()

const app = express()

app.use(bodyParser.json())
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
	})
)

const mongoURI = process.env.MONGO_URI

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch((error) => console.error("Error connecting to MongoDB", error))

app.use("/lead", leadRoutes)

module.exports = app
