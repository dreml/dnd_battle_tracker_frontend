export interface MonsterBaseI {
	id: string;
	slug: string;
	name: string;
	image?: string;
}

export interface MonsterI extends MonsterBaseI {
	health: number;
	armor: number;
	dateCreated: number;
	dateUpdated: number;
}

export interface MonsterForBattleI {
	id: string;
	initiative: number;
	health: number;
	armor: number;
}

export type MonsterNewT = Omit<MonsterI, "id">;
