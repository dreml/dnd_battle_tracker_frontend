import fs from "fs";
import { uniqueId } from "./lib.mjs";

const __dirname = import.meta.dirname;

const total = 10;
const campaignsArr = new Array(total).fill({});

try {
	fs.writeFileSync(
		__dirname + "/data/campaigns.json",
		JSON.stringify(
			campaignsArr.map((item, index) => {
				const id = uniqueId();
				return {
					id,
					name: `Кампания ${index}`,
					dateCreated: Date.now(),
					dateUpdated: Date.now(),
				};
			}),
		),
	);
	// file written successfully
} catch (err) {
	console.error(err);
}
