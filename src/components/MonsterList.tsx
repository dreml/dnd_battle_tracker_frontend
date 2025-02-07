import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import MonsterCard from "./MonsterCard";

interface Monster {
	index: string;
	name: string;
	url: string;
}

interface ApiResponse {
	count: number;
	results: Monster[];
}

const MonsterList: React.FC = () => {
	// Состояние для хранения данных
	const [monsters, setMonsters] = useState<Monster[]>([]);
	// Состояние для отслеживания загрузки
	const [loading, setLoading] = useState<boolean>(true);
	// Состояние для отслеживания ошибок
	const [error, setError] = useState<string | null>(null);
	const [activeKey, setActiveKey] = useState<string | null>(null);

	const handleToggle = (key: string) => {
		setActiveKey(activeKey === key ? null : key);
	};

	useEffect(() => {
		// Асинхронная функция для получения данных из API
		const fetchData = async () => {
			try {
				const response = await fetch("https://www.dnd5eapi.co/api/monsters");
				// Проверка на успешный ответ
				if (!response.ok) {
					throw new Error("Ошибка при получении данных");
				}
				const result: ApiResponse = await response.json();
				setMonsters(result.results);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<Accordion activeKey={activeKey}>
			{monsters.map((monster) => (
				<Card key={monster.index}>
					<Card.Header>
						<Accordion.Button onClick={() => handleToggle(monster.index)}>
							{monster.name}
						</Accordion.Button>
					</Card.Header>
					<Accordion.Collapse eventKey={monster.index}>
						<Card.Body>
							{activeKey === monster.index && (
								<MonsterCard monsterIndex={monster.index} />
							)}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			))}
		</Accordion>
	);
};

export default MonsterList;
