import { Button, Flex, Form, Input, InputNumber, Select, Spin } from "antd";
import {
	CharacterEditT,
	CharacterI,
	CharacterNewT,
} from "../../entities/character/model";
import { useEffect } from "react";
import { CampaignI } from "../../entities/campaign/model";

type FormValuesT = CharacterEditT | CharacterNewT;

interface CharacterFormI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: CharacterI | {};
	isDisabled?: boolean;
	isPending?: boolean;
	campaigns: CampaignI[];
}

function CharacterForm({
	onSubmit,
	initialValues = {},
	isDisabled = false,
	isPending = false,
	campaigns,
}: CharacterFormI) {
	const [form] = Form.useForm();

	const onFinish = (values: FormValuesT) => {
		onSubmit?.(values);
	};
	useEffect(() => form.resetFields(), [initialValues]);

	return (
		<Form
			form={form}
			initialValues={initialValues}
			layout={"horizontal"}
			style={{ maxWidth: 600 }}
			disabled={isDisabled || isPending}
			onFinish={onFinish}
		>
			<Form.Item
				name="name"
				label="Имя"
				rules={[{ required: true, max: 50, type: "string" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="playerName"
				label="Имя игрока"
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
			<Form.Item name="campaignId" label="Кампания">
				<Select
					options={campaigns.map(({ id, name }) => ({
						value: id,
						label: name,
					}))}
				/>
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

export default CharacterForm;
