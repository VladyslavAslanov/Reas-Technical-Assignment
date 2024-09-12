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

const mongoURI = "mongodb+srv://vladaslanov:vlad1213@reas.e7lvz.mongodb.net/leadsDB?retryWrites=true&w=majority"

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch((error) => console.error("Error connecting to MongoDB", error))

app.use("/lead", leadRoutes)

module.exports = app
