import { MonsterForBattleI } from "../../monster/model";

export interface BattleTemplateI {
	id: string;
	campaignId?: string;
	name: string;
	monsters: MonsterForBattleI[];
}

export type BattleTemplateNewT = Omit<BattleTemplateI, "id">;
