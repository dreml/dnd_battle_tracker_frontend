import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonsterNewT } from "../../entities/monster/model";
import { addNewMonster } from "../../entities/monster/api";
import { useNavigate } from "react-router";
import { ROUTE_MONSTER_LIST } from "../../shared/router";

function MonsterNew() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const monsterNewMutation = useMutation({
		mutationFn: (newMonster: MonsterNewT) => addNewMonster(newMonster),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["monsters"] });
			navigate(ROUTE_MONSTER_LIST);
		},
	});

	const onSubmit = (data: MonsterNewT) => {
		monsterNewMutation.mutate(data);
	};
	return (
		<PageWrapper
			header="Новый монстр"
			isError={monsterNewMutation.isError}
			errorMessage={monsterNewMutation.error?.message}
		>
			<MonsterForm
				onSubmit={onSubmit}
				isDisabled={monsterNewMutation.isPending}
				isPending={monsterNewMutation.isPending}
			/>
		</PageWrapper>
	);
}

export default MonsterNew;
