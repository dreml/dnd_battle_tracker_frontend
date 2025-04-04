import { SERVER, URL_CAMPAIGNS } from "../../../shared/config/api.ts";
import { CampaignEditT, CampaignI, CampaignNewT } from "../model";

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

async function getCampaign(id: string): Promise<CampaignI> {
	let response = await fetch(`${SERVER}${URL_CAMPAIGNS}/${id}`, {
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

async function createCampaign(data: CampaignNewT): Promise<CampaignI> {
	let response = await fetch(`${SERVER}${URL_CAMPAIGNS}`, {
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

async function updateCampaign(
	id: string,
	data: CampaignEditT,
): Promise<CampaignI> {
	let response = await fetch(`${SERVER}${URL_CAMPAIGNS}/${id}`, {
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

async function deleteCampaign(id: string): Promise<CampaignI> {
	let response = await fetch(`${SERVER}${URL_CAMPAIGNS}/${id}`, {
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

export {
	getCampaigns,
	getCampaign,
	createCampaign,
	updateCampaign,
	deleteCampaign,
};
