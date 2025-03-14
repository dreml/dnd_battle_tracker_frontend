import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { MonsterNewT } from "../../entities/monster/model";
import { useNavigate } from "react-router";
import { ROUTE_MONSTER_LIST } from "../../shared/router";
import { useMonsterCreateMutation } from "../../entities/monster/mutations";

function MonsterNew() {
	const navigate = useNavigate();

	const monsterCreateMutation = useMonsterCreateMutation();

	const onSubmit = (data: MonsterNewT) => {
		monsterCreateMutation.mutateAsync(data).then(() => {
			navigate(ROUTE_MONSTER_LIST);
		});
	};
	return (
		<PageWrapper
			header="Новый монстр"
			isError={monsterCreateMutation.isError}
			errorMessage={monsterCreateMutation.error?.message}
		>
			<MonsterForm
				onSubmit={onSubmit}
				isDisabled={monsterCreateMutation.isPending}
				isPending={monsterCreateMutation.isPending}
			/>
		</PageWrapper>
	);
}

export default MonsterNew;
