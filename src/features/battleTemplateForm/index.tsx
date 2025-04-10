import {
	Button,
	Col,
	Divider,
	Flex,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Spin,
} from "antd";
import { useEffect } from "react";
import { CampaignI } from "../../entities/campaign/model";
import {
	BattleTemplateEditT,
	BattleTemplateI,
	BattleTemplateNewT,
} from "../../entities/battleTemplate/model";
import { MonsterForBattleI, MonsterI } from "../../entities/monster/model";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

type FormValuesT = BattleTemplateEditT | BattleTemplateNewT;

interface BattleTemplateFormPropsI {
	onSubmit?: (data: FormValuesT) => void;
	initialValues?: BattleTemplateI | { monsters: [] };
	isDisabled?: boolean;
	isPending?: boolean;
	campaigns: CampaignI[];
	monsters: MonsterI[];
}

const defaultInitialValues: BattleTemplateFormPropsI["initialValues"] = {
	monsters: [],
};
function BattleTemplateForm({
	onSubmit,
	initialValues = defaultInitialValues,
	isDisabled = false,
	isPending = false,
	campaigns = [],
	monsters = [],
}: BattleTemplateFormPropsI) {
	const [battleTemplateForm] = Form.useForm<FormValuesT>();

	const onFinish = (values: FormValuesT) => {
		onSubmit?.(values);
	};

	useEffect(() => {
		battleTemplateForm.resetFields();
	}, [initialValues]);

	const onMonsterSelect = (id: string) => {
		const newMonsters: MonsterForBattleI[] = battleTemplateForm
			.getFieldValue("monsters")
			.map((monster: MonsterForBattleI) => {
				if (monster.id === id) {
					const newData = monsters.find((monster) => monster.id === id);
					return {
						id,
						armor: newData?.armor ?? 0,
						health: newData?.health ?? 0,
					};
				}
				return monster;
			});
		battleTemplateForm.setFieldValue("monsters", newMonsters);
	};

	return (
		<Form
			form={battleTemplateForm}
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
					showSearch
					optionFilterProp="label"
				/>
			</Form.Item>

			<div style={{ maxWidth: "600px" }}>
				<Divider orientation="left">Монстры</Divider>
				<Row justify="space-between">
					<Col span={8}>Имя</Col>
					<Col span={4}>Здоровье</Col>
					<Col span={4}>Броня</Col>
					<Col span={1}></Col>
				</Row>
			</div>

			<Form.List name="monsters">
				{(battleTemplateMonsters, { add, remove }) => (
					<div style={{ maxWidth: "600px" }}>
						{battleTemplateMonsters.map((currentMonster) => (
							<Row key={currentMonster.key} justify="space-between">
								<Col span={8}>
									<Form.Item
										{...currentMonster}
										name={[currentMonster.name, "id"]}
										rules={[{ required: true, message: "Выберите монстра" }]}
									>
										<Select
											options={monsters.map(({ id, name }) => ({
												value: id,
												label: `${name}`,
											}))}
											showSearch
											placeholder="Выберите монстра"
											optionFilterProp="label"
											onSelect={onMonsterSelect}
										/>
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item
										{...currentMonster}
										name={[currentMonster.name, "health"]}
										rules={[{ required: true, type: "integer", min: 0 }]}
										noStyle={true}
									>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item
										{...currentMonster}
										name={[currentMonster.name, "armor"]}
										rules={[{ required: true, type: "integer", min: 0 }]}
										noStyle={true}
									>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col span={1}>
									<CloseOutlined onClick={() => remove(currentMonster.name)} />
								</Col>
							</Row>
						))}
						<Form.Item style={{ maxWidth: "25%" }}>
							<Button
								type="dashed"
								onClick={() => add({ id: null, armor: 0, health: 0 })}
								block
								icon={<PlusOutlined />}
							>
								Добавить монстра
							</Button>
						</Form.Item>
					</div>
				)}
			</Form.List>
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
