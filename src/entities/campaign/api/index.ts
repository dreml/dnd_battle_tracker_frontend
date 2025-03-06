import { SERVER, URL_CAMPAIGNS } from "../../../shared/config/api.ts";
import { CampaignI } from "../model";

async function getCampaigns(): Promise<CampaignI[]> {
	let response = await fetch(`${SERVER}${URL_CAMPAIGNS}`, {
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

export { getCampaigns };
