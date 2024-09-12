import React, { useState } from "react"
import { Form, Steps } from "antd"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import useSubmitLead from "../hooks/useSubmitLead.ts"

const { Step } = Steps

interface FormValues {
	estateType?: string
	region?: string
	district?: string
	fullName?: string
	phone?: string
	email?: string
}

const FormPage: React.FC = () => {
	const [current, setCurrent] = useState<number>(0)
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	const [formValues, setFormValues] = useState<FormValues>({})
	const [form] = Form.useForm()

	const { handleSubmit, loading } = useSubmitLead()

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

	const onFinish = async (values: FormValues): Promise<void> => {
		const completeFormValues = { ...formValues, ...values }
		console.log("Form data: ", completeFormValues)

		await handleSubmit(
			completeFormValues,
			() => {
				form.resetFields()
				setFormValues({})
				setCurrent(0)
			},
			() => {
				console.log("Form submission failed")
			}
		)
	}

	const onFinishFailed = (): void => {
		console.log("Form submission failed")
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
					<StepOne selectedRegion={selectedRegion} handleRegionChange={handleRegionChange} next={next} />
				)}

				{current === 1 && <StepTwo prev={prev} submit={form.submit} />}
			</Form>

			{loading && <p>Submitting...</p>}
		</div>
	)
}

export default FormPage
