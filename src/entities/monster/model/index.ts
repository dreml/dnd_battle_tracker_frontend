export interface MonsterBaseI {
	id: string;
	slug: string;
	name: string;
	image?: string;
}

export interface MonsterI extends MonsterBaseI {
	health: number;
	armor: number;
}

// export type MonstersT = MonsterBaseI[];

export interface MonstersApiResponseI {
	count: number;
	results: MonsterBaseI[];
}
