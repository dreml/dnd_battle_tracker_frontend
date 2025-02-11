import { SERVER, URL_MONSTERS } from "../../../shared/api/config.ts";
import { MonstersApiResponseT } from "../model";

async function getMonsters(): Promise<MonstersApiResponseT> {
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

export { getMonsters };
