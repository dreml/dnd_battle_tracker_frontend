import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";

interface MonsterDetails {
	index: string;
	image: string;
	name: string;
	size: string;
	type: string;
	alignment: string;
}

interface MonsterCardProps {
	monsterIndex: string
}

function MonsterCard({ monsterIndex: monsterIndex }: MonsterCardProps) {
	const [shouldFetch, setShouldFetch] = useState(true);

	useEffect(() => {
	}, [monsterIndex])

	const { data: monster, isPending, error } = useQuery<MonsterDetails>({
		queryKey: ['monsters', monsterIndex],
		queryFn: async () => {
			const response = await fetch('https://www.dnd5eapi.co/api/monsters/' + monsterIndex)
			var res = response.json()
			console.log(res)
			return await res
		},
		enabled: shouldFetch,
		staleTime: 300000
	})

	if (isPending) {
		return 'Loading...'
	}

	if (error) {
		return 'Error: ' + error.message
	}

	return (
		<div>
			<h5>{monster.name}</h5>
			<img src={"https://www.dnd5eapi.co" + monster.image} width="100px" height="100px" />
			<p>Размер: {monster.size}</p>
			<p>Тип: {monster.type}</p>
			<p>Мировоззрение: {monster.alignment}</p>
			{/* Добавьте другие поля монстра здесь */}
		</div>
	);
}

export default MonsterCard;
