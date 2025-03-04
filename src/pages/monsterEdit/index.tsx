import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { RouteProps, useParams } from "react-router";
import { MonsterI, MonsterNewT } from "../../entities/monster/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMonster, updateMonster } from "../../entities/monster/api";

function MonsterEdit() {
	let params: RouteProps = useParams();
	const queryClient = useQueryClient();
	const monsterId = params.id || "";

	const monsterQuery = useQuery({
		queryKey: ["monster"],
		queryFn: () => getMonster(monsterId),
	});

	const editMutation = useMutation({
		mutationFn: (data: MonsterNewT) => updateMonster(monsterId, data),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["monsters"] });
			void queryClient.invalidateQueries({ queryKey: ["monster"] });
		},
	});

	//TODO: разобраться, как описывать тип
	const monster: MonsterI = monsterQuery?.data;

	const onSubmit = (data: MonsterNewT) => editMutation.mutate(data);

	return (
		<PageWrapper
			header={monster?.name || "Загружаем..."}
			isError={monsterQuery.isError || editMutation.isError}
			errorMessage={monsterQuery.error?.message || editMutation.error?.message}
		>
			<MonsterForm
				initialValues={monster ?? {}}
				onSubmit={onSubmit}
				isDisabled={
					editMutation.isPending ||
					monsterQuery.isPending ||
					editMutation.isError ||
					monsterQuery.isError
				}
				isPending={editMutation.isPending || monsterQuery.isPending}
			/>
		</PageWrapper>
	);
}

export default MonsterEdit;
