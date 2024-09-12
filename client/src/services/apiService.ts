import axios from "axios"

interface FormValues {
	estateType?: string
	region?: string
	district?: string
	fullName?: string
	phone?: string
	email?: string
}

const API_BASE_URL = "http://localhost:3000"

export const submitLead = async (data: FormValues): Promise<any> => {
	try {
		return await axios.post(`${API_BASE_URL}/lead`, data)
	} catch (error) {
		console.error("API request failed", error)
		throw error
	}
}
