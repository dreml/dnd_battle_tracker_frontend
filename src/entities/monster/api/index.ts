import { SERVER, URL_MONSTERS } from "../../../shared/config/api.ts";
import { MonsterNewT, MonstersApiResponseI } from "../model";

async function getMonsters(): Promise<MonstersApiResponseI> {
	let response = await fetch(`${SERVER}${URL_MONSTERS}`, {
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

async function addNewMonster(data: MonsterNewT) {
	let response = await fetch(`${SERVER}${URL_MONSTERS}`, {
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

// async function getMonster(id: string): Promise<MonstersApiResponseI> {}
export { getMonsters, addNewMonster };
