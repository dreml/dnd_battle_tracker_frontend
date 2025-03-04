import { Button, Flex, Form, Input, InputNumber, Spin, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SERVER } from "../../shared/config/api.ts";
import { MonsterI, MonsterNewT } from "../../entities/monster/model";
import { useEffect } from "react";

type FormValuesT = MonsterNewT | MonsterI;

interface MonsterFormI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: MonsterI | {};
	isDisabled?: boolean;
	isPending?: boolean;
}

function MonsterForm({
	onSubmit,
	initialValues = {},
	isDisabled = false,
	isPending = false,
}: MonsterFormI) {
	const [form] = Form.useForm();

	const onFinish = (values: FormValuesT) => {
		onSubmit?.(values);
	};
	useEffect(() => form.resetFields(), [initialValues]);
	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues || {}}
			layout={"horizontal"}
			style={{ maxWidth: 600 }}
			disabled={isDisabled || isPending}
		>
			<Form.Item
				name="name"
				label="Имя"
				rules={[{ required: true, max: 50, type: "string" }]}
			>
				<Input />
			</Form.Item>
			<Flex justify={"space-between"}>
				<div
					style={{
						flex: 1,
					}}
				>
					<Form.Item
						name="health"
						label="Здоровье"
						rules={[{ required: true, type: "integer", min: 0 }]}
					>
						<InputNumber />
					</Form.Item>
				</div>
				<div
					style={{
						flex: 1,
					}}
				>
					<Form.Item
						name="armor"
						label="Защита"
						rules={[{ required: true, type: "integer", min: 0 }]}
					>
						<InputNumber />
					</Form.Item>
				</div>
			</Flex>

			<Form.Item name="image" label="Изображение" valuePropName="image">
				<Upload
					listType="picture-card"
					maxCount={1}
					action={`${SERVER}/upload`}
				>
					<button style={{ border: 0, background: "none" }} type="button">
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Загрузить</div>
					</button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Flex gap={"small"} align={"center"}>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
					{isPending && <Spin />}
				</Flex>
			</Form.Item>
		</Form>
	);
}

export default MonsterForm;
