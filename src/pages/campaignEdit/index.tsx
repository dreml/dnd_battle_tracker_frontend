import { useState } from "react";

import PageWrapper from "../../shared/ui/pageWrapper";
import { RouteProps, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { campaignQueryOptions } from "../../entities/campaign/queries";
import { Tabs, TabsProps } from "antd";
import { TeamOutlined, ThunderboltOutlined } from "@ant-design/icons";
import CampaignForm from "../../widgets/campaignForm";
import { charactersQueryOptions } from "../../entities/character/queries";
import { CampaignEditT } from "../../entities/campaign/model";
import { useCampaignUpdateMutation } from "../../entities/campaign/mutations";
import BattlePrepare from "../../widgets/battlePrepare";
import { monstersQueryOptions } from "../../entities/monster/queries";
import { battleTemplatesQueryOptions } from "../../entities/battleTemplate/queries";
import { BattleI } from "../../entities/battle/model";
import { useBattleStartMutation } from "../../entities/battle/mutation";

function CampaignEdit() {
	const [isCampaignTouched, setIsCampaignTouched] = useState(false);
	const params: RouteProps = useParams();
	const campaignId = params.id ?? "";
	const campaignQuery = useQuery(campaignQueryOptions(campaignId));
	const campaign = campaignQuery?.data;

	const charactersQuery = useQuery(charactersQueryOptions());
	const characters = charactersQuery.data ?? [];

	const monstersQuery = useQuery(monstersQueryOptions());
	const monsters = monstersQuery.data ?? [];

	const battleTemplatesQuery = useQuery(battleTemplatesQueryOptions());
	const battleTemplates = battleTemplatesQuery.data ?? [];

	const campaignUpdateMutation = useCampaignUpdateMutation(campaignId);

	const battleStartMutation = useBattleStartMutation();

	const isError =
		campaignQuery.isError ||
		charactersQuery.isError ||
		monstersQuery.isError ||
		battleTemplatesQuery.isError ||
		campaignUpdateMutation.isError ||
		battleStartMutation.isError;
	const errorMessage =
		campaignQuery.error?.message ||
		charactersQuery.error?.message ||
		monstersQuery.error?.message ||
		battleTemplatesQuery.error?.message ||
		campaignUpdateMutation.error?.message ||
		battleStartMutation.error?.message;
	const isPending =
		campaignQuery.isPending ||
		charactersQuery.isPending ||
		monstersQuery.isPending ||
		battleTemplatesQuery.isPending ||
		campaignUpdateMutation.isPending ||
		battleStartMutation.isPending;

	const onCampaignSave = (data: CampaignEditT) =>
		campaignUpdateMutation
			.mutateAsync(data)
			.then(() => setIsCampaignTouched(false));

	const onCampaignTouchedChange = (isTouched: boolean) =>
		setIsCampaignTouched(isTouched);

	const onBattleStart = (data: BattleI) => {
		battleStartMutation
			.mutateAsync(data)
			// TODO: не обсудили логику перехода к бою после старта
			.then(() => console.log("Need redirect?"));
	};

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
					onTouched={onCampaignTouchedChange}
				/>
			),
			icon: <TeamOutlined />,
		},
		{
			key: "2",
			label: "Бой",
			children: (
				<div>
					{campaign && (
						<BattlePrepare
							campaign={campaign}
							characters={characters}
							monsters={monsters}
							battleTemplates={battleTemplates}
							onBattleStart={onBattleStart}
							isPending={isPending}
						/>
					)}
				</div>
			),
			icon: <ThunderboltOutlined />,
			disabled: isCampaignTouched,
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
