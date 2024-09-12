import React from "react"
import { Button, Form, Input } from "antd"

interface StepTwoProps {
	prev: () => void
	submit: () => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ prev, submit }) => {
	return (
		<>
			<Form.Item
				name="fullName"
				label="Full Name"
				rules={[{ required: true, message: "Please enter your full name!" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="phone"
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
				<Button type="primary" onClick={submit}>
					Submit
				</Button>
			</div>
		</>
	)
}

export default StepTwo
