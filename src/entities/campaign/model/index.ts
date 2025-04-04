export interface CampaignI {
	id: string;
	name: string;
	characters: string[];
	dateCreated: number;
	dateUpdated: number;
}

export type CampaignNewT = Omit<
	CampaignI,
	"id" | "dateCreated" | "dateUpdated"
>;
export type CampaignEditT = Omit<
	CampaignI,
	"id" | "dateCreated" | "dateUpdated"
>;
