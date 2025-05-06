import { CampaignI } from "../../entities/campaign/model";
import {
	CharacterForBattleI,
	CharacterI,
} from "../../entities/character/model";
import { MonsterI } from "../../entities/monster/model";
import { BattleTemplateI } from "../../entities/battleTemplate/model";
import { BattleI } from "../../entities/battle/model";
import { useEffect } from "react";
import {
	Button,
	Col,
	Divider,
	Flex,
	Form,
	Input,
	InputNumber,
	Row,
	Spin,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { sortByField } from "../../shared/lib";

enum BattleMemberType {
	character = "character",
	monster = "monster",
}

interface BattlePreparePropsI {
	campaign: CampaignI;
	characters: CharacterI[];
	monsters: MonsterI[];
	battleTemplates: BattleTemplateI[];
	isPending?: boolean;
	onBattleStart: (battleData: BattleI) => void;
}

interface FormMemberI {
	id: string;
	name: string;
	type: string;
	initiative: number;
	armor?: number;
	health?: number;
}

interface BattlePrepareFormI {
	members: FormMemberI[];
}

function BattlePrepare({
	campaign = { characters: [] },
	characters,
	monsters,
	battleTemplates,
	isPending = false,
	onBattleStart,
}: BattlePreparePropsI) {
	const [battlePrepareForm] = Form.useForm<BattlePrepareFormI>();

	useEffect(() => {
		const newFormData = campaign.characters?.map((id) => {
			const characterData = characters.find((char) => char.id === id);
			return {
				id,
				name: `${characterData?.name}(${characterData?.playerName})`,
				initiative: 0,
				armor: characterData?.armor,
				health: characterData?.health,
				type: BattleMemberType.character,
			};
		});
		battlePrepareForm.setFieldsValue({
			members: newFormData,
		});
	}, [campaign]);

	const onFinish = (data) => {
		console.log(data);
	};

	const onInitiativeChange = () => {
		const battleMemberData = [...battlePrepareForm.getFieldValue("members")];
		battleMemberData.sort(sortByField<FormMemberI>("initiative", false));
		battlePrepareForm.setFieldsValue({
			members: battleMemberData,
		});
	};

	return (
		<Form form={battlePrepareForm} onFinish={onFinish}>
			<div style={{ maxWidth: "600px" }}>
				<Divider orientation="left">Участники битвы</Divider>
				<Row justify="space-between">
					<Col span={8}>Имя</Col>
					<Col span={4}>Здоровье</Col>
					<Col span={4}>Броня</Col>
					<Col span={4}>Инициатива</Col>
					<Col span={1}></Col>
				</Row>
			</div>
			<Form.List name="members">
				{(battleMembers, { add, remove }) => (
					<div style={{ maxWidth: "600px" }}>
						{battleMembers.map((battleMember, index) => {
							const battleMemberData =
								battlePrepareForm.getFieldValue("members")[index];
							return (
								<Row key={battleMember.key} justify="space-between">
									<Col span={8}>
										<Form.Item
											{...battleMember}
											name={[battleMember.name, "name"]}
											noStyle={true}
										>
											<Input placeholder="name" disabled />
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...battleMember}
											name={[battleMember.name, "health"]}
											rules={[{ required: true, type: "integer", min: 0 }]}
											noStyle={true}
										>
											<InputNumber
												placeholder="Здоровье"
												disabled={
													battleMemberData?.type === BattleMemberType.character
												}
											/>
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...battleMember}
											name={[battleMember.name, "armor"]}
											rules={[{ required: true, type: "integer", min: 0 }]}
											noStyle={true}
										>
											<InputNumber
												placeholder="Броня"
												disabled={
													battleMemberData?.type === BattleMemberType.character
												}
											/>
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											{...battleMember}
											name={[battleMember.name, "initiative"]}
											rules={[{ required: true, type: "integer", min: 0 }]}
											noStyle={true}
										>
											<InputNumber
												placeholder="Инициатива"
												onPressEnter={onInitiativeChange}
												onBlur={onInitiativeChange}
											/>
										</Form.Item>
									</Col>

									<Col span={1}>
										{battleMemberData?.type === BattleMemberType.monster && (
											<CloseOutlined
												onClick={() => remove(battleMember.name)}
											/>
										)}
									</Col>
								</Row>
							);
						})}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								Добавить участника битвы
							</Button>
						</Form.Item>
					</div>
				)}
			</Form.List>

			<Form.Item>
				<Flex gap={"small"} align={"center"}>
					<Button type="primary" htmlType="submit">
						Начать бой
					</Button>
					{isPending && <Spin />}
				</Flex>
			</Form.Item>
		</Form>
	);
}

export default BattlePrepare;
