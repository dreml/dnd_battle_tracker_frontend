import { Button, Flex, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type MonsterFormT = {
	onSubmit?: (form: MonsterFormT) => void;
	initialValues?: MonsterFormT;
};

//TODO: вынести конфигурацию в отдельный файл и <ConfigProvider form={{ validateMessages }}>
const validateMessages = {
	required: "${label} is required",
	number: {
		min: "${label} must be minimum ${min}",
		max: "${label} must be maximum ${max}",
	},
};

function MonsterForm({
	onSubmit = () => {},
	initialValues = {},
}: MonsterFormT) {
	const [form] = Form.useForm();

	const onFinish = (values: MonsterFormT) => {
		console.log(values);
		onSubmit?.(values);
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}
			layout={"horizontal"}
			style={{ maxWidth: 600 }}
			validateMessages={validateMessages}
		>
			<Form.Item
				name="name"
				label="Name"
				rules={[{ required: true, max: 50, type: "string" }]}
			>
				<Input />
			</Form.Item>
			<Flex justify={"space-between"}>
				<div
					style={{
						width: "50%",
					}}
				>
					<Form.Item
						name="health"
						label="Health"
						rules={[{ required: true, type: "integer", min: 0 }]}
					>
						<InputNumber />
					</Form.Item>
				</div>
				<div
					style={{
						width: "50%",
					}}
				>
					<Form.Item
						name="armor"
						label="Armor"
						rules={[{ required: true, type: "integer", min: 0 }]}
					>
						<InputNumber />
					</Form.Item>
				</div>
			</Flex>

			<Form.Item name="image" label="Image" valuePropName="image">
				<Upload listType="picture-card" maxCount={1}>
					<button style={{ border: 0, background: "none" }} type="button">
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

export default MonsterForm;
