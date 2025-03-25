export interface CharacterI {
	id: string;
	armor: number;
	avatar?: string;
	campaignId?: string;
	dateCreated: number;
	dateUpdated: number;
	health: number;
	name: string;
	playerName: string;
}

export type CharacterNewT = Omit<CharacterI, "id">;
export type CharacterEditT = Omit<CharacterI, "id">;
