import PageWrapper from "../../shared/ui/pageWrapper";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { useQuery } from "@tanstack/react-query";
import { CampaignI } from "../../entities/campaign/model";
import { ColumnsType } from "antd/lib/table";
import { sortByAlphabet } from "../../shared/lib";
import { Button, Flex, Spin, Table } from "antd";
import { NavLink } from "react-router";
import { getRouteCampaignEdit, ROUTE_CAMPAIGN_LIST } from "../../shared/router";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import useSearchFilter from "../../shared/hook/useSearchFilter";
import { useCampaignDeleteMutation } from "../../entities/campaign/mutations";

function CampaignList() {
	const campaignsQuery = useQuery(campaignsQueryOptions());
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];

	const campaignDeleteMutation = useCampaignDeleteMutation();

	const getColumnSearchProps = useSearchFilter<CampaignI>();

	const columns: ColumnsType<CampaignI> = [
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
			width: "30%",
			...getColumnSearchProps("name", "имя"),
			sorter: (a: CampaignI, b: CampaignI) => sortByAlphabet(a.name, b.name),
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "",
			dataIndex: "description",
			key: "description",
			width: "30%",
			render: (_: unknown, item: CampaignI) => (
				<Flex gap="small" wrap>
					<NavLink to={getRouteCampaignEdit(item.id)}>
						<Button icon={<EditOutlined />} />
					</NavLink>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => campaignDeleteMutation.mutate(item.id)}
					/>
				</Flex>
			),
		},
	];

	const isPending =
		campaignsQuery.isPending || campaignDeleteMutation.isPending;
	const isError = campaignsQuery.isError || campaignDeleteMutation.isError;
	const errorMessage =
		campaignsQuery.error?.message || campaignDeleteMutation.error?.message;

	return (
		<PageWrapper
			header="Кампании"
			isError={isError}
			errorMessage={errorMessage}
		>
			<Flex gap="middle" vertical>
				<NavLink
					to={`${ROUTE_CAMPAIGN_LIST}/new`}
					style={{
						alignSelf: "flex-start",
					}}
				>
					<Button icon={<PlusCircleOutlined />}>Создать</Button>
				</NavLink>
				{isPending ? (
					<Spin size="large" />
				) : (
					<Table dataSource={campaigns} columns={columns} rowKey="id" />
				)}
			</Flex>
		</PageWrapper>
	);
}

export default CampaignList;
