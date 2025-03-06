import fs from "fs";
import { getRandomInt, uniqueId } from "./lib.mjs";

const __dirname = import.meta.dirname;
const monsterList = JSON.parse(
	fs.readFileSync(__dirname + "/data/monsters.json", "utf8"),
);

let newFullMonsterList = [];
let newShortMonsterList = [];

for (const monster of monsterList) {
	let id = uniqueId();
	newFullMonsterList.push({
		...monster,
		id,
		slug: monster.id,
		health: getRandomInt(100),
		armor: getRandomInt(100),
		dateCreated: Date.now(),
		dateUpdated: Date.now(),
	});
	newShortMonsterList.push({
		...monster,
		id,
	});
}

// try {
// 	fs.writeFileSync(
// 		dir + "/data/monstersList.json",
// 		JSON.stringify({
// 			count: newShortMonsterList.length,
// 			results: newShortMonsterList,
// 		}),
// 	);
// } catch (err) {
// 	console.error(err);
// }

try {
	fs.writeFileSync(
		__dirname + "/data/monstersFull.json",
		JSON.stringify(newFullMonsterList),
	);
	// file written successfully
} catch (err) {
	console.error(err);
}
