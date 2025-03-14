import PageWrapper from "../../shared/ui/pageWrapper";
import { useQuery } from "@tanstack/react-query";
import { battleTemplatesQueryOptions } from "../../entities/battleTemplate/queries";
import { BattleTemplateI } from "../../entities/battleTemplate/model";
import { ColumnsType } from "antd/lib/table";
import { sortByAlphabet } from "../../shared/lib";
import { Button, Flex, Spin, Table } from "antd";
import { NavLink } from "react-router";
import {
	getRouteBattleTemplateEdit,
	ROUTE_BATTLE_TEMPLATE_LIST,
} from "../../shared/router";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import useSearchFilter from "../../shared/hook/useSearchFilter";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { CampaignI } from "../../entities/campaign/model";
import { useBattleTemplateDeleteMutation } from "../../entities/battleTemplate/mutations";

interface BattleTemplateTableI extends BattleTemplateI {
	campaign?: string;
}

function BattleTemplateList() {
	const campaignsQuery = useQuery(campaignsQueryOptions());
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	const battleTemplatesQuery = useQuery({
		...battleTemplatesQueryOptions(),
		select: (battleTemplates) =>
			battleTemplates.map((item) => ({
				...item,
				campaign: campaigns.find(({ id }) => id === item.campaignId)?.name,
			})),
	});
	const battleTemplates = battleTemplatesQuery.data ?? [];
	const battleTemplateDeleteMutation = useBattleTemplateDeleteMutation();

	const getColumnSearchProps = useSearchFilter<BattleTemplateTableI>();

	const columns: ColumnsType<BattleTemplateTableI> = [
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
			width: "30%",
			...getColumnSearchProps("name", "имя"),
			sorter: (a: BattleTemplateI, b: BattleTemplateI) =>
				sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Кампания",
			dataIndex: "campaign",
			key: "campaign",
			width: "30%",
			...getColumnSearchProps("campaign", "кампания"),
			sorter: (a: BattleTemplateTableI, b: BattleTemplateTableI) =>
				sortByAlphabet(a.campaign ?? "", b.campaign ?? ""),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: BattleTemplateTableI) => (
				<Flex gap="small" wrap>
					<NavLink to={getRouteBattleTemplateEdit(item.id)}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => battleTemplateDeleteMutation.mutate(item.id)}
					/>
				</Flex>
			),
		},
	];

	const isPending = battleTemplatesQuery.isPending || campaignsQuery.isPending;
	const isError =
		battleTemplatesQuery.isError ||
		campaignsQuery.isError ||
		battleTemplateDeleteMutation.isError;
	const errorMessage =
		battleTemplatesQuery.error?.message ||
		campaignsQuery.error?.message ||
		battleTemplateDeleteMutation.error?.message;
	return (
		<PageWrapper header="Шаблоны" isError={isError} errorMessage={errorMessage}>
			<Flex gap="middle" vertical>
				<NavLink
					to={`${ROUTE_BATTLE_TEMPLATE_LIST}/new`}
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Button icon={<PlusCircleOutlined />}>Создать</Button>
				</NavLink>
				{isPending ? (
					<Spin size="large" />
				) : (
					<Table dataSource={battleTemplates} columns={columns} rowKey="id" />
				)}
			</Flex>
		</PageWrapper>
	);
}

export default BattleTemplateList;
