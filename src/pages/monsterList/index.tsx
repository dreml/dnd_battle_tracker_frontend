import PageWrapper from "../../shared/ui/pageWrapper";
import { MonsterBaseI } from "../../entities/monster/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMonster, getMonsters } from "../../entities/monster/api";
import { Table, Button, Flex, Spin } from "antd";
import { SERVER_IMG } from "../../shared/config/api.ts";
import { NavLink } from "react-router";
import { getRouteMonsterEdit, ROUTE_MONSTER_LIST } from "../../shared/router";
import {
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { sortByAlphabet } from "../../shared/lib";
import useSearchFilter from "../../shared/hook/useSearchFilter";
import { ColumnsType } from "antd/lib/table";

function MonsterList() {
	const queryClient = useQueryClient();

	const monstersQuery = useQuery({
		queryKey: ["monsters"],
		queryFn: getMonsters,
	});
	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteMonster(id),
		onSuccess: () =>
			void queryClient.invalidateQueries({ queryKey: ["monsters"] }),
	});
	const monsters: MonsterBaseI[] = monstersQuery.data?.results ?? [];

	const getColumnSearchProps = useSearchFilter<MonsterBaseI>();

	const columns: ColumnsType<MonsterBaseI> = [
		{
			title: "Изображение",
			dataIndex: "image",
			key: "image",
			width: "15%",
			render: (image: string, item: MonsterBaseI) => {
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
			width: "30%",
			...getColumnSearchProps("name", "имя"),
			sorter: (a: MonsterBaseI, b: MonsterBaseI) =>
				sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: MonsterBaseI) => (
				<Flex gap="small" wrap>
					<NavLink to={getRouteMonsterEdit(item.id)}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => deleteMutation.mutate(item.id)}
					/>
				</Flex>
			),
		},
	];

	return (
		<PageWrapper
			header="Монстры"
			isError={monstersQuery.isError || deleteMutation.isError}
			errorMessage={
				monstersQuery.error?.message || deleteMutation.error?.message
			}
		>
			<Flex gap="middle" vertical>
				<NavLink
					to={`${ROUTE_MONSTER_LIST}/new`}
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Button icon={<PlusCircleOutlined />}>Создать</Button>
				</NavLink>
				{monstersQuery.isPending ? (
					<Spin size="large" />
				) : (
					<Table dataSource={monsters} columns={columns} rowKey="id" />
				)}
			</Flex>
		</PageWrapper>
	);
}

export default MonsterList;
