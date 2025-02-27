import { SERVER, URL_CHARACTERS } from "../../../shared/config/api.ts";
import { CharacterI, CharacterNewT } from "../model";

async function getCharacters(): Promise<CharacterI[]> {
	let response = await fetch(`${SERVER}${URL_CHARACTERS}`, {
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

async function getCharacter(id: string): Promise<CharacterI> {
	let response = await fetch(`${SERVER}${URL_CHARACTERS}/${id}`, {
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

async function addNewCharacter(data: CharacterNewT): Promise<CharacterI> {
	let response = await fetch(`${SERVER}${URL_CHARACTERS}`, {
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

async function deleteCharacter(id: string): Promise<void> {
	let response = await fetch(`${SERVER}${URL_CHARACTERS}/${id}`, {
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

async function updateCharacter(
	id: string,
	data: CharacterNewT,
): Promise<CharacterI> {
	let response = await fetch(`${SERVER}${URL_CHARACTERS}/${id}`, {
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
	getCharacters,
	addNewCharacter,
	getCharacter,
	deleteCharacter,
	updateCharacter,
};
