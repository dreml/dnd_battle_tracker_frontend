import PageWrapper from "../../shared/ui/pageWrapper";
import { useEffect, useState } from "react";
import { MonsterBaseI, MonsterForTableI } from "../../entities/monster/model";
import { useQuery } from "@tanstack/react-query";
import { getMonsters } from "../../entities/monster/api";
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
	const [monsters, setMonsters] = useState<MonsterForTableI[]>([]);

	const monstersQuery = useQuery({
		queryKey: ["monsters"],
		queryFn: getMonsters,
	});

	useEffect(() => {
		if (monstersQuery.data) {
			let resultsForTable = monstersQuery.data.results.map(
				(item: MonsterBaseI) => ({
					...item,
					key: item.id,
				}),
			);
			//TODO: как правильно обрабатывать преобразование данных и расширение типов при этом
			setMonsters([...(resultsForTable as MonsterForTableI[])]);
		}
	}, [monstersQuery.data]);

	const getColumnSearchProps = useSearchFilter<MonsterForTableI>();

	const columns: ColumnsType<MonsterForTableI> = [
		{
			title: "Image",
			dataIndex: "image",
			key: "image",
			width: "15%",
			render: (image: string, item: MonsterForTableI) => {
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
					return <div />;
				}
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "30%",
			...getColumnSearchProps("name"),
			sorter: (a: MonsterBaseI, b: MonsterForTableI) =>
				sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: MonsterForTableI) => (
				<Flex gap="small" wrap>
					<NavLink to={getRouteMonsterEdit(item.id)}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button icon={<DeleteOutlined />} />
				</Flex>
			),
		},
	];

	return (
		<PageWrapper
			header="Monster List"
			isError={monstersQuery.isError}
			errorMessage={monstersQuery.error?.message}
		>
			<Flex gap="middle" vertical>
				<NavLink
					to={`${ROUTE_MONSTER_LIST}/new`}
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Button icon={<PlusCircleOutlined />}>Add new</Button>
				</NavLink>
				{monstersQuery.isPending ? (
					<Spin size="large" />
				) : (
					<Table dataSource={monsters} columns={columns} />
				)}
			</Flex>
		</PageWrapper>
	);
}

export default MonsterList;
