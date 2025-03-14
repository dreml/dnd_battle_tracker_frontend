import { BattleTemplateI, BattleTemplateNewT } from "../model";
import { SERVER, URL_BATTLE_TEMPLATES } from "../../../shared/config/api.ts";

async function getBattleTemplates(): Promise<BattleTemplateI[]> {
	let response = await fetch(`${SERVER}${URL_BATTLE_TEMPLATES}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

async function getBattleTemplate(id: string): Promise<BattleTemplateI> {
	let response = await fetch(`${SERVER}${URL_BATTLE_TEMPLATES}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

async function createBattleTemplate(
	data: BattleTemplateNewT,
): Promise<BattleTemplateI> {
	let response = await fetch(`${SERVER}${URL_BATTLE_TEMPLATES}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

async function deleteBattleTemplate(id: string): Promise<void> {
	let response = await fetch(`${SERVER}${URL_BATTLE_TEMPLATES}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}

async function updateBattleTemplate(
	id: string,
	data: BattleTemplateNewT,
): Promise<BattleTemplateI> {
	let response = await fetch(`${SERVER}${URL_BATTLE_TEMPLATES}/${id}`, {
		method: "PATCH",
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

export {
	getBattleTemplates,
	getBattleTemplate,
	createBattleTemplate,
	deleteBattleTemplate,
	updateBattleTemplate,
};
