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

export type MonsterNewT = Omit<MonsterI, "id">;
