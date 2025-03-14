import PageWrapper from "../../shared/ui/pageWrapper";
import BattleTemplateForm from "../../features/battleTemplateForm";
import { useQuery } from "@tanstack/react-query";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { CampaignI } from "../../entities/campaign/model";
import { monstersQueryOptions } from "../../entities/monster/queries";
import { MonsterI } from "../../entities/monster/model";
import { RouteProps, useParams } from "react-router";
import { battleTemplateQueryOptions } from "../../entities/battleTemplate/queries";
import { BattleTemplateEditT } from "../../entities/battleTemplate/model";
import { useBattleTemplateUpdateMutation } from "../../entities/battleTemplate/mutations";

function BattleTemplateEdit() {
	const params: RouteProps = useParams();
	const battleTemplateId = params.id ?? "";

	const battleTemplateQuery = useQuery(
		battleTemplateQueryOptions(battleTemplateId),
	);
	const battleTemplate = battleTemplateQuery?.data;
	const battleTemplateUpdateMutation =
		useBattleTemplateUpdateMutation(battleTemplateId);
	const campaignsQuery = useQuery(campaignsQueryOptions());
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	const monstersQuery = useQuery(monstersQueryOptions());
	const monsters: MonsterI[] = monstersQuery.data ?? [];

	const onSubmit = (data: BattleTemplateEditT) =>
		battleTemplateUpdateMutation.mutate(data);
	const isError =
		battleTemplateQuery.isError ||
		battleTemplateUpdateMutation.isError ||
		campaignsQuery.isError ||
		monstersQuery.isError;
	const isPending =
		battleTemplateQuery.isPending ||
		battleTemplateUpdateMutation.isPending ||
		campaignsQuery.isPending ||
		monstersQuery.isPending;
	const errorMessage =
		battleTemplateQuery.error?.message ||
		battleTemplateUpdateMutation.error?.message ||
		campaignsQuery.error?.message ||
		monstersQuery.error?.message;

	return (
		<PageWrapper
			header={battleTemplate?.name ?? "Загружается..."}
			isError={isError}
			errorMessage={errorMessage}
		>
			<BattleTemplateForm
				campaigns={campaigns}
				monsters={monsters}
				isPending={isPending}
				initialValues={battleTemplate}
				onSubmit={onSubmit}
			/>
		</PageWrapper>
	);
}

export default BattleTemplateEdit;
