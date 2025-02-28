import { Button, Flex, Form, Input, InputNumber, Select, Spin } from "antd";
import { CharacterI, CharacterNewT } from "../../entities/character/model";
import { useEffect } from "react";
import { CampaignI } from "../../entities/campaign/model";

type FormValuesT = CharacterI | CharacterNewT;

interface CharacterFormI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: CharacterI;
	isDisabled?: boolean;
	isPending?: boolean;
	campaigns: CampaignI[];
}

function CharacterForm(props: CharacterFormI) {
	const [form] = Form.useForm();

	const onFinish = (values: FormValuesT) => {
		props.onSubmit?.(values);
	};
	useEffect(() => form.resetFields(), [props.initialValues]);

	return (
		<Form
			form={form}
			initialValues={props.initialValues || {}}
			layout={"horizontal"}
			style={{ maxWidth: 600 }}
			disabled={props?.isDisabled || false}
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
						width: "50%",
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
						width: "50%",
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
					options={props.campaigns.map(({ id, name }) => ({
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
					{(props?.isPending || false) && <Spin />}
				</Flex>
			</Form.Item>
		</Form>
	);
}

export default CharacterForm;
