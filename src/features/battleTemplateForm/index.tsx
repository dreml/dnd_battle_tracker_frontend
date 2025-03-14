import {
	Button,
	Flex,
	Form,
	Input,
	InputNumber,
	Select,
	Spin,
	Table,
} from "antd";
import { useEffect, useState } from "react";
import { CampaignI } from "../../entities/campaign/model";
import {
	BattleTemplateEditT,
	BattleTemplateI,
	BattleTemplateNewT,
} from "../../entities/battleTemplate/model";
import { MonsterForBattleI, MonsterI } from "../../entities/monster/model";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined } from "@ant-design/icons";
import { uniqueId } from "../../shared/lib";

type FormValuesT = BattleTemplateEditT | BattleTemplateNewT;

interface BattleTemplateFormPropsI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: BattleTemplateI | { monsters: [] };
	isDisabled?: boolean;
	isPending?: boolean;
	campaigns: CampaignI[];
	monsters: MonsterI[];
}

interface MonstersFormI extends MonsterForBattleI {
	key: string;
}

function BattleTemplateForm({
	onSubmit,
	initialValues = { monsters: [] },
	isDisabled = false,
	isPending = false,
	campaigns = [],
	monsters = [],
}: BattleTemplateFormPropsI) {
	const [form] = Form.useForm();
	const [battleMonsters, setBattleMonsters] = useState<MonstersFormI[]>([]);

	const onFinish = ({ name, campaignId }: FormValuesT) => {
		const result = {
			name,
			campaignId,
			monsters: battleMonsters.map(({ id, health, armor, initiative }) => ({
				id,
				health,
				armor,
				initiative,
			})),
		};
		onSubmit?.(result);
	};

	const deleteBattleMonster = (key: string) => {
		setBattleMonsters((prevState) =>
			prevState.filter((monster) => monster.key !== key),
		);
	};
	const addBattleMonster = (id: string) => {
		const monster = monsters.find((monster) => monster.id === id);
		const newMonsterData: MonstersFormI = {
			key: uniqueId(),
			id,
			initiative: 0,
			health: monster?.health ?? 0,
			armor: monster?.armor ?? 0,
		};
		setBattleMonsters((prevState) => [...prevState, newMonsterData]);
	};

	const changeBattleMonster = (
		field: string,
		key: string,
		value: number | string | null,
	) => {
		setBattleMonsters((prevState) =>
			prevState.map((monster) => {
				if (monster.key !== key) return monster;
				return {
					...monster,
					[field]: value,
				};
			}),
		);
	};
	useEffect(() => {
		form.resetFields();
		if (initialValues) {
			setBattleMonsters(
				initialValues.monsters.map((monster: MonsterForBattleI) => ({
					...monster,
					key: uniqueId(),
				})),
			);
		}
	}, [initialValues]);

	const battleMonstersColumns: ColumnsType<MonstersFormI> = [
		{
			title: "Имя",
			dataIndex: "key",
			key: "key",
			width: "20%",
			render: (_: unknown, item: MonstersFormI) => (
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
			render: (_: unknown, item: MonstersFormI) => (
				<Form.Item
					name={`initiative-${item.key}`}
					initialValue={item.initiative}
					rules={[{ required: true, type: "integer", min: 0 }]}
					noStyle={true}
				>
					<InputNumber
						onChange={(value) =>
							changeBattleMonster("initiative", item.key, value)
						}
					/>
				</Form.Item>
			),
		},
		{
			title: "Здоровье",
			dataIndex: "health",
			key: "health",
			width: "20%",
			render: (_: unknown, item: MonstersFormI) => (
				<Form.Item
					name={`health-${item.key}`}
					initialValue={item.health}
					rules={[{ required: true, type: "integer", min: 0 }]}
					noStyle={true}
				>
					<InputNumber
						onChange={(value) => changeBattleMonster("health", item.key, value)}
					/>
				</Form.Item>
			),
		},
		{
			title: "Броня",
			dataIndex: "armor",
			key: "armor",
			width: "20%",
			render: (_: unknown, item: MonstersFormI) => (
				<Form.Item
					name={`armor-${item.key}`}
					initialValue={item.armor}
					rules={[{ required: true, type: "integer", min: 0 }]}
					noStyle={true}
				>
					<InputNumber
						onChange={(value) => changeBattleMonster("armor", item.key, value)}
					/>
				</Form.Item>
			),
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "20%",
			render: (_: unknown, item: MonstersFormI) => (
				<Flex gap="small" wrap>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => deleteBattleMonster(item.key)}
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
					rowKey="key"
				/>
			)}
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

export default BattleTemplateForm;
