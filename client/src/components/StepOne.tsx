import React from "react"
import { Button, Form, Select } from "antd"
import { czechRegions } from "../data/czechRegions"
import { districtsByRegion } from "../data/districtsByRegion"

interface StepOneProps {
	selectedRegion: string | null
	handleRegionChange: (value: string) => void
	next: () => void
}

export const StepOne: React.FC<StepOneProps> = ({ selectedRegion, handleRegionChange, next }) => {
	const { Option } = Select
	const regions = czechRegions.map((region) => (
		<Option key={region.value} value={region.value}>
			{region.label}
		</Option>
	))

	return (
		<>
			<Form.Item
				name="estateType"
				label="Estate Type"
				rules={[{ required: true, message: "Please select the property type!" }]}
			>
				<Select placeholder="Select property type">
					<Option value="apartment">Apartment</Option>
					<Option value="house">House</Option>
					<Option value="land">Land</Option>
				</Select>
			</Form.Item>

			<Form.Item name="region" label="Region" rules={[{ required: true, message: "Please select the region!" }]}>
				<Select placeholder="Select region" onChange={handleRegionChange}>
					{regions}
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
		</>
	)
}

export default StepOne
