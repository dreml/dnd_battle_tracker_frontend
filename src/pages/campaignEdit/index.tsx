import PageWrapper from "../../shared/ui/pageWrapper";
import { RouteProps, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { campaignQueryOptions } from "../../entities/campaign/queries";
import { Tabs, TabsProps } from "antd";
import { TeamOutlined, ThunderboltOutlined } from "@ant-design/icons";
import CampaignForm from "../../features/campaignForm";
import { charactersQueryOptions } from "../../entities/character/queries";
import { CampaignEditT } from "../../entities/campaign/model";
import { useCampaignUpdateMutation } from "../../entities/campaign/mutations";

function CampaignEdit() {
	const params: RouteProps = useParams();
	const campaignId = params.id ?? "";
	const campaignQuery = useQuery(campaignQueryOptions(campaignId));
	const campaign = campaignQuery?.data;

	const charactersQuery = useQuery(charactersQueryOptions());
	const characters = charactersQuery.data ?? [];

	const campaignUpdateMutation = useCampaignUpdateMutation(campaignId);

	const isError =
		campaignQuery.isError ||
		charactersQuery.isError ||
		campaignUpdateMutation.isError;
	const errorMessage =
		campaignQuery.error?.message ||
		charactersQuery.error?.message ||
		campaignUpdateMutation.error?.message;
	const isPending =
		campaignQuery.isPending ||
		charactersQuery.isPending ||
		campaignUpdateMutation.isPending;

	const onCampaignSave = (data: CampaignEditT) =>
		campaignUpdateMutation.mutate(data);

	const tabItems: TabsProps["items"] = [
		{
			key: "1",
			label: "Кампания",
			children: (
				<CampaignForm
					initialValues={campaign}
					characters={characters}
					isPending={isPending}
					onSubmit={onCampaignSave}
				/>
			),
			icon: <TeamOutlined />,
		},
		{
			key: "2",
			label: "Бой",
			children: <h2>hey33!!</h2>,
			icon: <ThunderboltOutlined />,
		},
	];

	return (
		<PageWrapper
			header={campaign?.name ?? "Загружается..."}
			isError={isError}
			errorMessage={errorMessage}
		>
			<Tabs defaultActiveKey="1" items={tabItems} />
		</PageWrapper>
	);
}
export default CampaignEdit;
