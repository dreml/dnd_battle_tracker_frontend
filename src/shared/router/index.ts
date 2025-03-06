export const LIBRARY = "library";
export const MONSTERS = "monsters";
export const CHARACTERS = "characters";
export const CAMPAIGNS = "campaigns";
export const BATTLES = "battles";
export const NEW = "new";
export const ID = ":id";

export const ROUTE_LIBRARY = `/${LIBRARY}`;
export const ROUTE_MONSTER_LIST = `${ROUTE_LIBRARY}/${MONSTERS}`;
export const ROUTE_MONSTER_NEW = `${ROUTE_MONSTER_LIST}/${NEW}`;
export const getRouteMonsterEdit = (id: string) =>
	`${ROUTE_MONSTER_LIST}/${id}`;

export const ROUTE_CHARACTER_LIST = `${ROUTE_LIBRARY}/${CHARACTERS}`;
export const getRouteCharacterEdit = (id: string) =>
	`${ROUTE_CHARACTER_LIST}/${id}`;
export const ROUTE_CAMPAIGN_LIST = `/${CAMPAIGNS}`;
export const ROUTE_BATTLE_LIST = `/${BATTLES}`;
export const ROUTE_ACTIVE_CAMPAIGN = "active-campaign";
