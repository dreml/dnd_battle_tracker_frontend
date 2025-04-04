import fs from "fs";
import { getRandomInt, uniqueId } from "./lib.mjs";

const __dirname = import.meta.dirname;

const total = 10;
const campaignsArr = new Array(total).fill({});
const charactersFull = JSON.parse(
	fs.readFileSync(__dirname + "/data/characters.json", "utf8"),
);
try {
	fs.writeFileSync(
		__dirname + "/data/campaigns.json",
		JSON.stringify(
			campaignsArr.map((item, index) => {
				const id = uniqueId();
				const characters = Array(getRandomInt(5))
					.fill("")
					.map((_, index) => charactersFull[index]?.id);
				return {
					id,
					name: `Кампания ${index}`,
					characters,
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
