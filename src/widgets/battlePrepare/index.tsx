import { CampaignI } from "../../entities/campaign/model";
import {
	CharacterForBattleI,
	CharacterI,
} from "../../entities/character/model";
import { MonsterI } from "../../entities/monster/model";
import { BattleTemplateI } from "../../entities/battleTemplate/model";
import { BattleI } from "../../entities/battle/model";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
	name: string;
	type: string;
	initiative: number;
	armor?: number;
	health?: number;
}

interface BattlePrepareFormI {
	members: FormMemberI[];
}

function BattleMemberItem({
	member,
	onFieldChange,
}: {
	member: FormMemberI;
	onFieldChange: (
		id: FormMemberI["id"],
		field: keyof FormMemberI,
		data: string,
	) => {};
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: member.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
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
									onFieldChange(member.id, "initiative", event.target.value)
								}
							/>
						</Form.Item>
					</Col>

					<Col span={1}>
						{member?.type === BattleMemberType.monster && (
							<CloseOutlined onClick={() => console.log(member.id)} />
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
}

function BattlePrepare({
	campaign = { characters: [] },
	characters,
	monsters,
	battleTemplates,
	isPending = false,
	onBattleStart,
}: BattlePreparePropsI) {
	// const [battlePrepareForm] = Form.useForm<BattlePrepareFormI>();
	const [battlePrepareData, setBattlePrepareData] = useState<FormMemberI[]>([]);

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
		setBattlePrepareData(newFormData);
	}, [campaign]);

	const onFinish = (data) => {
		console.log(data);
	};

	const onMemberDataChange = (
		id: FormMemberI["id"],
		field: keyof FormMemberI,
		value: string,
	) => {
		setBattlePrepareData((oldData) => {
			const newData = oldData.map((member) => {
				if (member.id === id) {
					member[field] = value;
				}
				return member;
			});
			if (field === "initiative") {
				newData.sort(sortByField<FormMemberI>("initiative", false));
			}
			return newData;
		});
	};

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		console.log(active.id, over?.id);
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
							key={member.id}
							onFieldChange={onMemberDataChange}
							member={member}
						/>
					))}
				</SortableContext>
			</DndContext>
		</>
	);
}

export default BattlePrepare;
