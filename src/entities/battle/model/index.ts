import { CharacterForBattleI } from "../../character/model";
import { MonsterForBattleI } from "../../monster/model";

export interface BattleI {
	campaignId: string;
	characters: CharacterForBattleI[];
	monsters: MonsterForBattleI[];
}
