import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { useMutation } from "@tanstack/react-query";
import { MonsterNewT } from "../../entities/monster/model";
import { addNewMonster } from "../../entities/monster/api";
import { useNavigate } from "react-router";
import { ROUTE_MONSTER_LIST } from "../../shared/router";

function MonsterNew() {
	let navigate = useNavigate();

	const monsterNewMutation = useMutation({
		mutationFn: (newMonster: MonsterNewT) => addNewMonster(newMonster),
		onSuccess: () => navigate(ROUTE_MONSTER_LIST),
	});

	const onSubmit = (data: MonsterNewT) => {
		monsterNewMutation.mutate(data);
	};
	return (
		<PageWrapper header="New Monster">
			<MonsterForm
				onSubmit={onSubmit}
				isDisabled={monsterNewMutation.isPending}
				isPending={monsterNewMutation.isPending}
			/>
		</PageWrapper>
	);
}

export default MonsterNew;
