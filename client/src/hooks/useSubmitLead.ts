import { useState } from "react"
import { message } from "antd"
import { submitLead } from "../services/apiService"

interface FormValues {
	estateType?: string
	region?: string
	district?: string
	fullName?: string
	phone?: string
	email?: string
}

const useSubmitLead = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (formValues: FormValues, onSuccess: () => void, onFailure: () => void): Promise<void> => {
		setLoading(true)

		try {
			const response = await submitLead(formValues)

			if (response.status === 201) {
				message.success("Form submitted successfully!")
				onSuccess()
			} else {
				message.error("Error submitting form.")
				onFailure()
			}
		} catch (error) {
			message.error("Form submission failed. Please try again.")
			console.log("API request failed", error)
			onFailure()
		} finally {
			setLoading(false)
		}
	}

	return { handleSubmit, loading }
}

export default useSubmitLead
