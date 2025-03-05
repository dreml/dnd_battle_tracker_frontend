import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { RouteProps, useParams } from "react-router";
import { MonsterNewT } from "../../entities/monster/model";
import { useQuery } from "@tanstack/react-query";
import { monsterQueryOptions } from "../../entities/monster/queries";
import { useMonsterUpdateMutation } from "../../entities/monster/mutations";

function MonsterEdit() {
	let params: RouteProps = useParams();
	const monsterId = params.id || "";

	const monsterQuery = useQuery(monsterQueryOptions(monsterId));

	const monsterEditMutation = useMonsterUpdateMutation(monsterId);

	const monster = monsterQuery?.data;

	const onSubmit = (data: MonsterNewT) => monsterEditMutation.mutate(data);

	return (
		<PageWrapper
			header={monster?.name || "Загружаем..."}
			isError={monsterQuery.isError || monsterEditMutation.isError}
			errorMessage={
				monsterQuery.error?.message || monsterEditMutation.error?.message
			}
		>
			<MonsterForm
				initialValues={monster ?? {}}
				onSubmit={onSubmit}
				isDisabled={
					monsterEditMutation.isPending ||
					monsterQuery.isPending ||
					monsterEditMutation.isError ||
					monsterQuery.isError
				}
				isPending={monsterEditMutation.isPending || monsterQuery.isPending}
			/>
		</PageWrapper>
	);
}

export default MonsterEdit;
