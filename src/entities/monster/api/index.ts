import { SERVER, URL_MONSTERS } from "../../../shared/api/config.ts";
import { MonstersApiResponseI } from "../model";

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

async function deleteMonster(id: string): Promise<void> {
	let response = await fetch(`${SERVER}${URL_MONSTERS}/${id}`, {
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
export { getMonsters, deleteMonster };
