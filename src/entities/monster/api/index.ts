import { SERVER, URL_MONSTERS } from "../../../shared/config/api.ts";
import { MonsterI, MonsterNewT, MonstersApiResponseI } from "../model";

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

async function getMonster(id: string): Promise<MonsterI> {
	let response = await fetch(`${SERVER}${URL_MONSTERS}/${id}`, {
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

async function updateMonster(id: string, data: MonsterNewT): Promise<MonsterI> {
	let response = await fetch(`${SERVER}${URL_MONSTERS}/${id}`, {
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
export { getMonsters, addNewMonster, getMonster, deleteMonster, updateMonster };
