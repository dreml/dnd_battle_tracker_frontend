import PageWrapper from "../../shared/ui/pageWrapper";
import MonsterForm from "../../features/monsterForm";
import { RouteProps, useParams } from "react-router";
import { MonsterI } from "../../entities/monster/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMonster } from "../../entities/monster/api";

function MonsterEdit() {
	const [monster, setMonster] = useState<MonsterI>();
	let params: RouteProps = useParams();
	const monsterQuery = useQuery({
		queryKey: ["monster"],
		queryFn: () => getMonster(params.id),
	});

	useEffect(() => {
		setMonster(monsterQuery.data);
	}, [monsterQuery.data]);

	return (
		<PageWrapper header="Monster edit">
			<MonsterForm initialValues={monster} />
		</PageWrapper>
	);
}

export default MonsterEdit;
