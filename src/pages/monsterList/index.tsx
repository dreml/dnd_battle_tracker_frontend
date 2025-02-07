import PageWrapper from "../../shared/ui/pageWrapper";
import {useEffect, useState} from "react";
import {MonstersT} from "../../entities/monster/model";
import {useQuery} from "@tanstack/react-query";
import {getMonsters} from "../../entities/monster/api";

function MonsterList() {
	const [monsters, setMonsters] = useState<MonstersT>();

	const monstersQuery = useQuery({
		queryKey: ["monsters"], queryFn: getMonsters
	})

	useEffect(() => {
		if (monstersQuery.data) {
			setMonsters([...monstersQuery.data.results]);
		}
	}, [monstersQuery.data]);

	return <PageWrapper header="Monster List">

	</PageWrapper>;
}

export default MonsterList;
