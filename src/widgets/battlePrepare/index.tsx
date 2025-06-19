import { CampaignI } from "../../entities/campaign/model";
import {
	CharacterForBattleI,
	CharacterI,
} from "../../entities/character/model";
import { MonsterForBattleI, MonsterI } from "../../entities/monster/model";
import { BattleTemplateI } from "../../entities/battleTemplate/model";
import { BattleI } from "../../entities/battle/model";
import { ChangeEvent, useEffect, useState } from "react";
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
import { CloseOutlined } from "@ant-design/icons";
import { sortByField, uniqueId } from "../../shared/lib";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
	key: string;
	name: string;
	type: string;
	initiative: number;
	armor?: number;
	health?: number;
}

function BattleMemberItem({
	member,
	onFieldChange,
	onDelete,
}: {
	member: FormMemberI;
	onFieldChange: (
		key: FormMemberI["key"],
		field: keyof Pick<FormMemberI, "initiative" | "armor" | "health">,
		data: string,
	) => void;
	onDelete: (key: FormMemberI["key"]) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: member.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		marginBottom: "20px",
		cursor: "grab",
	};
	const [battleMemberForm] = Form.useForm<FormMemberI>();
	useEffect(() => {
		battleMemberForm.resetFields();
	}, [member]);
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Form initialValues={member} form={battleMemberForm}>
				<Row justify="space-between">
					<Col span={8}>
						<Form.Item name={"name"} noStyle={true}>
							<Input placeholder="name" disabled />
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item
							name={"health"}
							rules={[{ required: true, type: "integer", min: 0 }]}
							noStyle={true}
						>
							<InputNumber
								placeholder="Здоровье"
								disabled={member?.type === BattleMemberType.character}
								onBlur={(event: ChangeEvent<HTMLInputElement>) =>
									onFieldChange(member.key, "health", event.target.value)
								}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item
							name={"armor"}
							rules={[{ required: true, type: "integer", min: 0 }]}
							noStyle={true}
						>
							<InputNumber
								placeholder="Броня"
								disabled={member?.type === BattleMemberType.character}
								onBlur={(event: ChangeEvent<HTMLInputElement>) =>
									onFieldChange(member.key, "armor", event.target.value)
								}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item
							name={"initiative"}
							rules={[{ required: true, type: "integer", min: 0 }]}
							noStyle={true}
						>
							<InputNumber
								placeholder="Инициатива"
								onBlur={(event: ChangeEvent<HTMLInputElement>) =>
									onFieldChange(member.key, "initiative", event.target.value)
								}
							/>
						</Form.Item>
					</Col>

					<Col span={1}>
						{member?.type === BattleMemberType.monster && (
							<CloseOutlined onClick={() => onDelete(member.key)} />
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
}

function BattlePrepare({
	campaign = {
		characters: [],
		id: "",
		name: "",
		dateCreated: 0,
		dateUpdated: 0,
	},
	characters,
	monsters,
	battleTemplates,
	isPending = false,
	onBattleStart,
}: BattlePreparePropsI) {
	const [battlePrepareData, setBattlePrepareData] = useState<FormMemberI[]>([]);

	useEffect(() => {
		const newFormData = campaign.characters?.map((id) => {
			const characterData = characters.find((char) => char.id === id);
			return {
				id,
				key: uniqueId(),
				name: `${characterData?.name}(${characterData?.playerName})`,
				initiative: 0,
				armor: characterData?.armor,
				health: characterData?.health,
				type: BattleMemberType.character,
			};
		});
		setBattlePrepareData(newFormData);
	}, [campaign]);

	const onFinish = () => {
		const battleStartData = battlePrepareData.reduce<BattleI>(
			(result, battleMember) => {
				if (battleMember.type === BattleMemberType.character) {
					const newChar: CharacterForBattleI = {
						id: battleMember.id,
						initiative: Number(battleMember.initiative),
					};
					result.characters.push(newChar);
				} else {
					const newMonster: MonsterForBattleI = {
						id: battleMember.id,
						health: Number(battleMember?.health),
						armor: Number(battleMember?.armor),
						initiative: Number(battleMember.initiative),
					};
					result.monsters.push(newMonster);
				}
				return result;
			},
			{
				campaignId: campaign.id,
				characters: [],
				monsters: [],
			},
		);
		onBattleStart(battleStartData);
	};

	const onMemberDataChange = (
		key: FormMemberI["key"],
		field: keyof Pick<FormMemberI, "initiative" | "health" | "armor">,
		value: string,
	) => {
		setBattlePrepareData((oldData) => {
			const newData = oldData.map((member) => {
				if (member.key === key) {
					member[field] = Number(value);
				}
				return member;
			});
			if (field === "initiative") {
				newData.sort(sortByField<FormMemberI>("initiative", false));
			}
			return newData;
		});
	};

	const onMonsterAdd = (id: FormMemberI["id"]) => {
		setBattlePrepareData((oldData) => {
			const monster = monsters?.find((data) => data.id === id);
			return oldData.concat({
				id,
				key: uniqueId(),
				type: BattleMemberType.monster,
				name: monster?.name ?? "",
				health: monster?.health ?? 0,
				armor: monster?.armor ?? 0,
				initiative: 0,
			});
		});
	};

	const onMonsterFromTempateAdd = (id: BattleTemplateI["id"]) => {
		setBattlePrepareData((oldData) => {
			const newMonsters: FormMemberI[] | undefined = battleTemplates
				.find((template) => template.id === id)
				?.monsters.map((monster) => {
					return {
						id: monster.id,
						key: uniqueId(),
						type: BattleMemberType.monster,
						health: monster?.health,
						armor: monster?.armor,
						initiative: monster?.initiative ?? 0,
						name:
							monsters.find(
								(fullDataMonster) => fullDataMonster.id === monster.id,
							)?.name ?? "",
					};
				});
			if (newMonsters) {
				return oldData
					.concat(newMonsters)
					.sort(sortByField<FormMemberI>("initiative", false));
			}
			return oldData;
		});
	};

	const onBattleMemberDelete = (key: FormMemberI["key"]) => {
		setBattlePrepareData((oldData) =>
			oldData.filter((member) => member.key !== key),
		);
	};

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setBattlePrepareData((items) => {
				const oldIndex = items.findIndex((member) => member.id === active.id);
				const newIndex = items.findIndex((member) => member.id === over?.id);
				items[oldIndex] = {
					...items[oldIndex],
					initiative: items[newIndex].initiative,
				};
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 1,
			},
		}),
	);

	return (
		<>
			<Row justify="space-between">
				<Col span={16}>
					<Divider orientation="left">Участники битвы</Divider>
					<Row justify="space-between">
						<Col span={8}>Имя</Col>
						<Col span={4}>Здоровье</Col>
						<Col span={4}>Броня</Col>
						<Col span={4}>Инициатива</Col>
						<Col span={1} />
					</Row>

					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={onDragEnd}
					>
						<SortableContext
							items={battlePrepareData}
							strategy={verticalListSortingStrategy}
						>
							{battlePrepareData.map((member) => (
								<BattleMemberItem
									key={member.key}
									onFieldChange={onMemberDataChange}
									onDelete={onBattleMemberDelete}
									member={member}
								/>
							))}
						</SortableContext>
					</DndContext>
				</Col>
				<Col span={7}>
					<Row>
						<Col span={24}>
							<Divider orientation="left">Добавить из шаблона</Divider>
							<Select
								style={{
									width: "100%",
								}}
								options={battleTemplates.map(({ id, name }) => ({
									value: id,
									label: `${name}`,
								}))}
								showSearch
								placeholder="Выберите шаблон"
								optionFilterProp="label"
								onSelect={onMonsterFromTempateAdd}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Divider orientation="left">Добавить из монстра</Divider>
							<Select
								style={{
									width: "100%",
								}}
								options={monsters.map(({ id, name }) => ({
									value: id,
									label: `${name}`,
								}))}
								showSearch
								placeholder="Выберите монстра"
								optionFilterProp="label"
								onSelect={onMonsterAdd}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Flex gap={"small"} align={"center"}>
				<Button type="primary" htmlType="submit" onClick={onFinish}>
					Начать битву!
				</Button>
				{isPending && <Spin />}
			</Flex>
		</>
	);
}

export default BattlePrepare;
