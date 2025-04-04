export interface MonsterI {
	id: string;
	slug: string;
	name: string;
	image?: string;
	health: number;
	armor: number;
	dateCreated: number;
	dateUpdated: number;
}

export interface MonsterForBattleI {
	id: string;
	health: number;
	armor: number;
}

export type MonsterNewT = Omit<MonsterI, "id">;
export type MonsterEditT = Omit<MonsterI, "id">;
