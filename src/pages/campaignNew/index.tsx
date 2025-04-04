import PageWrapper from "../../shared/ui/pageWrapper";
import { useQuery } from "@tanstack/react-query";
import { charactersQueryOptions } from "../../entities/character/queries";
import CampaignForm from "../../features/campaignForm";
import { useCampaignCreateMutation } from "../../entities/campaign/mutations";
import { getRouteCampaignEdit } from "../../shared/router";
import { CampaignNewT } from "../../entities/campaign/model";
import { useNavigate } from "react-router";
import { Tabs, TabsProps } from "antd";
import { TeamOutlined, ThunderboltOutlined } from "@ant-design/icons";

function CampaignNew() {
	const navigate = useNavigate();
	const charactersQuery = useQuery(charactersQueryOptions());
	const characters = charactersQuery.data ?? [];

	const campaignCreateMutation = useCampaignCreateMutation();

	const onCampaignCreate = (data: CampaignNewT) => {
		campaignCreateMutation.mutateAsync(data).then((result) => {
			navigate(getRouteCampaignEdit(result.id));
		});
	};

	const isError = charactersQuery.isError || campaignCreateMutation.isError;
	const errorMessage =
		charactersQuery.error?.message || campaignCreateMutation.error?.message;
	const isPending =
		charactersQuery.isPending || campaignCreateMutation.isPending;

	const tabItems: TabsProps["items"] = [
		{
			key: "1",
			label: "Кампания",
			children: (
				<CampaignForm
					characters={characters}
					isPending={isPending}
					onSubmit={onCampaignCreate}
				/>
			),
			icon: <TeamOutlined />,
		},
		{
			key: "2",
			label: "Бой",
			children: <h2>hey33!!</h2>,
			icon: <ThunderboltOutlined />,
			disabled: true,
		},
	];
	return (
		<PageWrapper
			header="Новая кампания"
			isError={isError}
			errorMessage={errorMessage}
		>
			<Tabs defaultActiveKey="1" items={tabItems} />
		</PageWrapper>
	);
}
export default CampaignNew;
