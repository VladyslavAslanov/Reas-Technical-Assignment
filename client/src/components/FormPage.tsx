import React, { useState } from "react"
import { Form, message, Steps } from "antd"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"

const { Step } = Steps

interface FormValues {
	propertyType?: string
	region?: string
	district?: string
	fullName?: string
	phoneNumber?: string
	email?: string
}

const FormPage: React.FC = () => {
	const [current, setCurrent] = useState<number>(0)
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	const [formValues, setFormValues] = useState<FormValues>({})
	const [form] = Form.useForm()

	const next = async (): Promise<void> => {
		try {
			const currentValues: FormValues = await form.validateFields()
			setFormValues((prev: FormValues) => ({ ...prev, ...currentValues }))
			setCurrent(current + 1)
		} catch (error) {
			console.log("Validation failed", error)
		}
	}

	const prev = (): void => {
		setCurrent(current - 1)
	}

	const onFinish = (values: FormValues): void => {
		const completeFormValues = { ...formValues, ...values }
		console.log("Form data: ", completeFormValues)
		void message.success("Form submitted successfully!")
		form.resetFields()
		setFormValues({})
		setCurrent(0)
	}

	const onFinishFailed = (): void => {
		void message.error("Form submission failed. Please try again.")
	}

	const handleRegionChange = (value: string): void => {
		setSelectedRegion(value)
		form.setFieldsValue({ district: undefined })
	}

	return (
		<div className="container mx-auto p-6">
			<Steps current={current}>
				<Step title="Property Details" />
				<Step title="Contact Info" />
			</Steps>
			<Form
				form={form}
				name="propertyForm"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout="vertical"
				className="mt-6"
				initialValues={formValues}
			>
				{current === 0 && (
					<StepOne
						selectedRegion={selectedRegion}
						handleRegionChange={handleRegionChange}
						next={next}
					/>
				)}

				{current === 1 && (
					<StepTwo prev={prev} submit={form.submit} />
				)}
			</Form>
		</div>
	)
}

export default FormPage
