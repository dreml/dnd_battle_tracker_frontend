import PageWrapper from "../../shared/ui/pageWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCharacter, getCharacters } from "../../entities/character/api";
import { CharacterI } from "../../entities/character/model";
import { ColumnsType } from "antd/lib/table";
import { SERVER_IMG } from "../../shared/config/api.ts";
import { NavLink } from "react-router";
import {
	getRouteCharacterEdit,
	ROUTE_CHARACTER_LIST,
} from "../../shared/router";
import { Button, Flex, Spin, Table } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import useSearchFilter from "../../shared/hook/useSearchFilter";
import { sortByAlphabet, sortByNumber } from "../../shared/lib";

function CharacterList() {
	const queryClient = useQueryClient();

	const charactersQuery = useQuery({
		queryKey: ["characters"],
		queryFn: getCharacters,
	});
	const deleteCharacterMutation = useMutation({
		mutationFn: (id: string) => deleteCharacter(id),
		onSuccess: () =>
			void queryClient.invalidateQueries({ queryKey: ["characters"] }),
	});
	const characters: CharacterI[] = charactersQuery.data ?? [];

	const getColumnSearchProps = useSearchFilter<CharacterI>();

	const columns: ColumnsType<CharacterI> = [
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
			...getColumnSearchProps("name", "имя"),
			sorter: (a: CharacterI, b: CharacterI) => sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Имя игрока",
			dataIndex: "playerName",
			key: "playerName",
			width: "20%",
			...getColumnSearchProps("playerName", "имя игрока"),
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
		//TODO: возможно, надо будет вывести название кампании, пока не определились с этим функционалом
		{
			title: "Кампания",
			dataIndex: "campaignId",
			key: "campaignId",
			width: "15%",
			...getColumnSearchProps("campaignId", "кампания"),
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: CharacterI) => (
				<Flex gap="small" wrap>
					<NavLink to={getRouteCharacterEdit(item.id)}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => deleteCharacterMutation.mutate(item.id)}
					/>
				</Flex>
			),
		},
	];
	return (
		<PageWrapper header="Персонажи">
			<Flex gap="middle" vertical>
				<NavLink
					to={`${ROUTE_CHARACTER_LIST}/new`}
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Button icon={<PlusCircleOutlined />}>Создать</Button>
				</NavLink>
				{charactersQuery.isPending ? (
					<Spin size="large" />
				) : (
					<Table dataSource={characters} columns={columns} rowKey="id" />
				)}
			</Flex>
		</PageWrapper>
	);
}

export default CharacterList;
