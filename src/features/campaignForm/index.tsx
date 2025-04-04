import { Button, Flex, Form, Input, Select, Spin, Table } from "antd";
import {
	CampaignEditT,
	CampaignI,
	CampaignNewT,
} from "../../entities/campaign/model";
import { CharacterI } from "../../entities/character/model";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { SERVER_IMG } from "../../shared/config/api.ts";
import { DeleteOutlined } from "@ant-design/icons";
import { sortByAlphabet, sortByNumber } from "../../shared/lib";

type FormValuesT = CampaignEditT | CampaignNewT;

interface CampaignFormPropsI {
	onSubmit?: (data: FormValuesT) => void;
	onTouched?: (isTouched: boolean) => void;
	initialValues?: CampaignI | { characters: string[] };
	isDisabled?: boolean;
	isPending?: boolean;
	characters: CharacterI[];
}

const defaultInitialValues: CampaignFormPropsI["initialValues"] = {
	characters: [],
};

function CampaignForm({
	onSubmit,
	onTouched,
	initialValues = defaultInitialValues,
	isDisabled = false,
	isPending = false,
	characters = [],
}: CampaignFormPropsI) {
	const [campaignCharacters, setCampaignCharacters] = useState<CharacterI[]>(
		[],
	);

	const [form] = Form.useForm();
	useEffect(() => {
		form.resetFields();
		if (initialValues?.characters && characters.length > 0) {
			const newCampaignCharacters = initialValues?.characters.map((id) => {
				return characters.find((char) => char.id === id);
			});
			setCampaignCharacters(newCampaignCharacters);
		}
	}, [initialValues, characters]);

	const addCharacter = (id: string) => {
		setCampaignCharacters((prevState) => [
			...prevState,
			characters?.find((character) => character.id === id),
		]);
		onTouched?.(true);
	};

	const deleteCharacter = (id: string) => {
		setCampaignCharacters((prevState) =>
			prevState.filter((character) => character.id !== id),
		);
		onTouched?.(true);
	};

	const onFinish = ({ name }: FormValuesT) => {
		const result = {
			name,
			characters: campaignCharacters.map(({ id }) => id),
		};
		onTouched?.(false);
		onSubmit?.(result);
	};

	const onValuesChange = () => {
		onTouched?.(true);
	};

	const campaignCharactersColumns: ColumnsType<CharacterI> = [
		{
			title: "Изображение",
			dataIndex: "image",
			key: "image",
			width: "15%",
			render: (image: string, item: CharacterI) => {
				if (image) {
					return (
						<img
							src={`${SERVER_IMG}${image}`}
							width={50}
							height={50}
							alt={`${item.name}`}
						/>
					);
				} else {
					return null;
				}
			},
		},
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
			width: "20%",
			sorter: (a: CharacterI, b: CharacterI) => sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Имя игрока",
			dataIndex: "playerName",
			key: "playerName",
			width: "20%",
			sorter: (a: CharacterI, b: CharacterI) =>
				sortByAlphabet(a.playerName, b.playerName),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Здоровье",
			dataIndex: "health",
			key: "health",
			width: "10%",
			sorter: (a: CharacterI, b: CharacterI) =>
				sortByNumber(a.health, b.health),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Броня",
			dataIndex: "armor",
			key: "armor",
			width: "10%",
			sorter: (a: CharacterI, b: CharacterI) => sortByNumber(a.armor, b.armor),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: CharacterI) => (
				<Flex gap="small" wrap>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => deleteCharacter(item.id)}
					/>
				</Flex>
			),
		},
	];
	return (
		<Form
			form={form}
			onFinish={onFinish}
			onValuesChange={onValuesChange}
			initialValues={initialValues}
			layout={"horizontal"}
			disabled={isDisabled || isPending}
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
				name="monsters"
				label="Добавить персонажа"
				style={{ maxWidth: 600 }}
			>
				<Select
					options={characters.map(({ id, name, playerName }) => ({
						value: id,
						label: `${name} (${playerName})`,
						disabled: !!campaignCharacters.find((char) => char.id === id),
					}))}
					onSelect={(id) => addCharacter(id)}
				/>
			</Form.Item>
			{campaignCharacters.length > 0 && (
				<Table
					dataSource={campaignCharacters}
					columns={campaignCharactersColumns}
					rowKey="id"
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

export default CampaignForm;
