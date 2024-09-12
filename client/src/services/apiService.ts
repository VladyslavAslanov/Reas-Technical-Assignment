import axios from "axios"

interface FormValues {
	estateType?: string
	region?: string
	district?: string
	fullName?: string
	phone?: string
	email?: string
}

const root = process.env.VITE_API_ROOT

export const submitLead = async (data: FormValues): Promise<any> => {
	try {
		return await axios.post(`${root}/lead`, data)
	} catch (error) {
		console.error("API request failed", error)
		throw error
	}
}
