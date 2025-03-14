import { getMonster, getMonsters } from "../api";

enum MonsterQueryKey {
	monsters = "monsters",
	monster = "monster",
}

const monstersQueryOptions = () => ({
	queryKey: [MonsterQueryKey.monsters],
	queryFn: getMonsters,
});

const monsterQueryOptions = (id: string) => ({
	queryKey: [MonsterQueryKey.monster],
	queryFn: () => getMonster(id),
});

export { monsterQueryOptions, monstersQueryOptions, MonsterQueryKey };
