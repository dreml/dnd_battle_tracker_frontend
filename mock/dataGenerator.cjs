const getRandomInt = (max) => Math.floor(Math.random() * max);

const uniqueId = () => {
	const dateString = Date.now().toString(36);
	const randomness = Math.random().toString(36).substr(2);
	return dateString + randomness;
};

const fs = require("fs");

const dir = __dirname;
const monsterList = JSON.parse(
	fs.readFileSync(dir + "/data/monsters.json", "utf8"),
);

// const newMonsterList = monsterList.map((monster) => ({
// 	...monster,
// 	id: uniqueId(),
// 	slug: monster.id,
// 	health: getRandomInt(100),
// 	armor: getRandomInt(100),
// 	dateCreated: Date.now(),
// 	dateUpdated: Date.now(),
// }));

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

try {
	fs.writeFileSync(
		dir + "/data/monstersList.json",
		JSON.stringify({
			count: newShortMonsterList.length,
			results: newShortMonsterList,
		}),
	);
} catch (err) {
	console.error(err);
}

try {
	fs.writeFileSync(
		dir + "/data/monstersFull.json",
		JSON.stringify(newFullMonsterList),
	);
	// file written successfully
} catch (err) {
	console.error(err);
}
