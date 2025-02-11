import PageWrapper from "../../shared/ui/pageWrapper";
import { useEffect, useState } from "react";
import { MonsterBaseI } from "../../entities/monster/model";
import { useQuery } from "@tanstack/react-query";
import { getMonsters } from "../../entities/monster/api";
import { Table, Button, Flex } from "antd";
import { SERVER_IMG } from "../../shared/api/config.ts";
import { NavLink } from "react-router";
import { ROUTE_MONSTER_LIST } from "../../shared/router";
import {
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

function MonsterList() {
	const [monsters, setMonsters] = useState<MonsterBaseI[]>([]);

	const monstersQuery = useQuery({
		queryKey: ["monsters"],
		queryFn: getMonsters,
	});

	useEffect(() => {
		if (monstersQuery.data) {
			setMonsters([...monstersQuery.data.results]);
		}
	}, [monstersQuery.data]);

	const columns = [
		{
			title: "Image",
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
					return <div />;
				}
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "30%",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: MonsterBaseI) => (
				<Flex gap="small" wrap>
					<NavLink to={`${ROUTE_MONSTER_LIST}/${item.id}`}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button icon={<DeleteOutlined />} />
				</Flex>
			),
		},
	];

	return (
		<PageWrapper header="Monster List">
			<Flex gap="middle" vertical>
				<NavLink to={`${ROUTE_MONSTER_LIST}/new`}>
					<Button icon={<PlusCircleOutlined />}>Add new</Button>
				</NavLink>
				<Table<MonsterBaseI> dataSource={monsters} columns={columns} />
			</Flex>
		</PageWrapper>
	);
}

export default MonsterList;
