import PageWrapper from "../../shared/ui/pageWrapper";
import BattleTemplateForm from "../../features/battleTemplateForm";
import { useQuery } from "@tanstack/react-query";
import { campaignsQueryOptions } from "../../entities/campaign/queries";
import { CampaignI } from "../../entities/campaign/model";
import { useBattleTemplateCreateMutation } from "../../entities/battleTemplate/mutations";
import { BattleTemplateNewT } from "../../entities/battleTemplate/model";
import { ROUTE_BATTLE_TEMPLATE_LIST } from "../../shared/router";
import { useNavigate } from "react-router";
import { monstersQueryOptions } from "../../entities/monster/queries";
import { MonsterI } from "../../entities/monster/model";

function BattleTemplateNew() {
	const navigate = useNavigate();

	const campaignsQuery = useQuery(campaignsQueryOptions());
	const campaigns: CampaignI[] = campaignsQuery.data ?? [];
	const monstersQuery = useQuery(monstersQueryOptions());
	const monsters: MonsterI[] = monstersQuery.data ?? [];

	const battleTemplateCreateMutation = useBattleTemplateCreateMutation();

	const onSubmit = (data: BattleTemplateNewT) => {
		battleTemplateCreateMutation.mutateAsync(data).then(() => {
			navigate(ROUTE_BATTLE_TEMPLATE_LIST);
		});
	};

	const isError =
		campaignsQuery.isError ||
		battleTemplateCreateMutation.isError ||
		monstersQuery.isError;
	const errorMessage =
		campaignsQuery.error?.message ||
		battleTemplateCreateMutation.error?.message ||
		monstersQuery.error?.message;
	const isPending =
		campaignsQuery.isPending ||
		battleTemplateCreateMutation.isPending ||
		monstersQuery.isPending;

	return (
		<PageWrapper
			header="Новый шаблон боя"
			isError={isError}
			errorMessage={errorMessage}
		>
			<BattleTemplateForm
				campaigns={campaigns}
				monsters={monsters}
				onSubmit={onSubmit}
				isPending={isPending}
			/>
		</PageWrapper>
	);
}

export default BattleTemplateNew;
