import { Button, Flex, Form, Input, InputNumber, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { CampaignI } from "../../entities/campaign/model";
import {
	BattleTemplateI,
	BattleTemplateNewT,
} from "../../entities/battleTemplate/model";
import { MonsterBaseI, MonsterForBattleI } from "../../entities/monster/model";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined } from "@ant-design/icons";

type FormValuesT = BattleTemplateI | BattleTemplateNewT;

interface BattleTemplateFormPropsI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: BattleTemplateI | {};
	isDisabled?: boolean;
	isPending?: boolean;
	campaigns: CampaignI[];
	monsters: MonsterBaseI[];
}

function BattleTemplateForm({
	onSubmit,
	initialValues,
	isDisabled = false,
	isPending = false,
	campaigns = [],
	monsters = [],
}: BattleTemplateFormPropsI) {
	const [form] = Form.useForm();
	const [battleMonsters, setBattleMonsters] = useState<MonsterForBattleI[]>([]);

	const onFinish = (values: FormValuesT) => {
		onSubmit?.(values);
	};

	const deleteBattleMonster = (id: string) => {
		setBattleMonsters((prevState) =>
			prevState.filter((monster) => monster.id !== id),
		);
	};
	const addBattleMonster = (id: string) => {
		const newMonsterData: MonsterForBattleI = {
			id,
			initiative: 0,
			health: 0,
			armor: 0,
		};
		setBattleMonsters((prevState) => [...prevState, newMonsterData]);
	};
	useEffect(() => form.resetFields(), [initialValues]);

	const battleMonstersColumns: ColumnsType<MonsterForBattleI> = [
		{
			title: "Имя",
			dataIndex: "id",
			key: "id",
			width: "20%",
			render: (_: unknown, item: MonsterForBattleI) => (
				<div>
					{monsters.find(({ id }: { id: string }) => id === item.id)?.name}
				</div>
			),
		},
		{
			title: "Инициатива",
			dataIndex: "initiative",
			key: "initiative",
			width: "20%",
			render: (_: unknown, item: MonsterForBattleI) => (
				<Form.Item
					name={`initiative-${item.id}`}
					initialValue={item.initiative}
					rules={[{ required: true, type: "integer", min: 0 }]}
				>
					<InputNumber />
				</Form.Item>
			),
		},
		{
			title: "Здоровье",
			dataIndex: "health",
			key: "health",
			width: "20%",
			render: (_: unknown, item: MonsterForBattleI) => (
				<Form.Item
					name={`health-${item.id}`}
					initialValue={item.health}
					rules={[{ required: true, type: "integer", min: 0 }]}
				>
					<InputNumber />
				</Form.Item>
			),
		},
		{
			title: "Броня",
			dataIndex: "armor",
			key: "armor",
			width: "20%",
			render: (_: unknown, item: MonsterForBattleI) => (
				<Form.Item
					name={`armor-${item.id}`}
					initialValue={item.armor}
					rules={[{ required: true, type: "integer", min: 0 }]}
				>
					<InputNumber />
				</Form.Item>
			),
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "20%",
			render: (_: unknown, item: MonsterForBattleI) => (
				<Flex gap="small" wrap>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => deleteBattleMonster(item.id)}
					/>
				</Flex>
			),
		},
	];

	return (
		<Form
			form={form}
			initialValues={initialValues}
			layout={"horizontal"}
			disabled={isDisabled || isPending}
			onFinish={onFinish}
		>
			<Form.Item
				name="name"
				label="Имя"
				rules={[{ required: true, max: 50, type: "string" }]}
				style={{ maxWidth: 600 }}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="campaignId"
				label="Кампания"
				rules={[{ required: true, max: 50, type: "string" }]}
				style={{ maxWidth: 600 }}
			>
				<Select
					options={campaigns.map(({ id, name }) => ({
						value: id,
						label: name,
					}))}
				/>
			</Form.Item>
			<Form.Item name="monsters" label="Добавить монстра">
				<Select
					options={monsters.map(({ id, name }) => ({
						value: id,
						label: name,
					}))}
					onSelect={(id) => addBattleMonster(id)}
				/>
			</Form.Item>
			{battleMonsters.length > 0 && (
				<Table
					dataSource={battleMonsters}
					columns={battleMonstersColumns}
					rowKey="id"
				/>
			)}
		</Form>
	);
}

export default BattleTemplateForm;
