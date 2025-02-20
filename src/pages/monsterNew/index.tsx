import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { useMutation } from "@tanstack/react-query";
import { MonsterNewT } from "../../entities/monster/model";
import { addNewMonster } from "../../entities/monster/api";
import { Spin } from "antd";
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
			{monsterNewMutation.isPending ? (
				<Spin size="large" />
			) : (
				<MonsterForm onSubmit={onSubmit} />
			)}
		</PageWrapper>
	);
}

export default MonsterNew;
