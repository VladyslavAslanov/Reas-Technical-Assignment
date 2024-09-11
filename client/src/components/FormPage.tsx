import React, { useState } from "react"
import { Button, Form, Input, Select, Steps } from "antd"
import { czechRegions } from "../data/czechRegions.ts"
import { districtsByRegion } from "../data/districtsByRegion.ts"

const { Option } = Select
const { Step } = Steps

const FormPage: React.FC = () => {
	const [current, setCurrent] = useState(0)
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	const [form] = Form.useForm()

	const next = () => {
		setCurrent(current + 1)
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const onFinish = (values: any) => {
		console.log("Form data: ", values)
	}

	const handleRegionChange = (value: string) => {
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
				layout="vertical"
				className="mt-6"
			>
				{current === 0 && (
					<div>
						<Form.Item
							name="propertyType"
							label="Property Type"
							rules={[{ required: true, message: "Please select the property type!" }]}
						>
							<Select placeholder="Select property type">
								<Option value="apartment">Apartment</Option>
								<Option value="house">House</Option>
								<Option value="land">Land</Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="region"
							label="Region"
							rules={[{ required: true, message: "Please select the region!" }]}
						>
							<Select placeholder="Select region" onChange={handleRegionChange}>
								{czechRegions.map((region) => (
									<Option key={region.value} value={region.value}>
										{region.label}
									</Option>
								))}
							</Select>
						</Form.Item>

						{selectedRegion && (
							<Form.Item
								name="district"
								label="District"
								rules={[{ required: true, message: "Please select the district!" }]}
							>
								<Select placeholder="Select district">
									{districtsByRegion[selectedRegion].map((district) => (
										<Option key={district} value={district}>
											{district}
										</Option>
									))}
								</Select>
							</Form.Item>
						)}

						<Button type="primary" onClick={next}>
							Next
						</Button>
					</div>
				)}

				{current === 1 && (
					<div>
						<Form.Item
							name="fullName"
							label="Full Name"
							rules={[{ required: true, message: "Please enter your full name!" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="phoneNumber"
							label="Phone Number"
							rules={[
								{ required: true, message: "Please enter your phone number!" },
								{
									pattern: /^\+420 ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
									message: "Please enter a valid Czech phone number!"
								}
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: "Please enter your email!" },
								{ type: "email", message: "Please enter a valid email!" }
							]}
						>
							<Input />
						</Form.Item>

						<div className="flex justify-between">
							<Button onClick={prev}>Previous</Button>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</div>
					</div>
				)}
			</Form>
		</div>
	)
}

export default FormPage
