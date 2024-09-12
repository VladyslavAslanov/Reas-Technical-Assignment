const express = require("express")
const router = express.Router()
const Lead = require("../models/Lead")

const isValidCzechPhoneNumber = (phone) => {
	const phoneRegex = /^\+420 ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/
	return phoneRegex.test(phone)
}

const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

router.post("/", async (req, res) => {
	const { estateType, fullName, phone, email, region, district } = req.body

	if (!estateType || !fullName || !phone || !email || !region || !district) {
		return res.status(400).json({ message: "All fields are required" })
	}

	if (!isValidCzechPhoneNumber(phone)) {
		return res.status(400).json({ message: "Invalid Czech phone number" })
	}

	if (!isValidEmail(email)) {
		return res.status(400).json({ message: "Invalid email format" })
	}

	try {
		const newLead = new Lead({
			estateType, fullName, phone, email, region, district
		})

		await newLead.save()
		res.status(201).json({ message: "Lead created successfully", lead: newLead })
	} catch (error) {
		res.status(500).json({ message: "Server error", error })
	}
})

module.exports = router
