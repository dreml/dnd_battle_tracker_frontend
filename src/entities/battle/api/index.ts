import { SERVER, URL_BATTLE } from "../../../shared/config/api.ts";
import { BattleI } from "../model";

async function startBattle(data: BattleI) {
	let response = await fetch(`${SERVER}${URL_BATTLE}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

async function stopBattle(campaignId: string) {
	let response = await fetch(`${SERVER}${URL_BATTLE}/stop`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			campaignId,
		}),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

export { startBattle, stopBattle };
