import fs from "fs";
import { getRandomInt, uniqueId } from "./lib.mjs";

const __dirname = import.meta.dirname;
const monsterList = JSON.parse(
	fs.readFileSync(__dirname + "/data/monstersFull.json", "utf8"),
);
const campaigns = JSON.parse(
	fs.readFileSync(__dirname + "/data/campaigns.json", "utf8"),
);

let battleCount = 5;
let battleTemplates = [];

for (let i = 0; i < battleCount; i++) {
	const monsterCount = getRandomInt(5) + 1;
	let monsters = [];
	for (let j = 0; j < monsterCount; j++) {
		let { id, health, armor } =
			monsterList[getRandomInt(monsterList.length - 1)];
		monsters.push({
			id,
			health,
			armor,
			initiative: getRandomInt(10),
		});
	}
	battleTemplates.push({
		id: uniqueId(),
		name: `Шаблон №${i + 1}`,
		campaignId: campaigns[getRandomInt(campaigns.length - 1)].id,
		monsters,
	});
}

try {
	fs.writeFileSync(
		__dirname + "/data/battleTemplates.json",
		JSON.stringify(battleTemplates),
	);
	// file written successfully
} catch (err) {
	console.error(err);
}
