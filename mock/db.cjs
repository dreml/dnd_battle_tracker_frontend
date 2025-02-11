const fs = require("fs");

const dir = __dirname;
const data = {
	monsters: JSON.parse(fs.readFileSync(dir + "/data/monsters.json", "utf8")),
	monstersList: JSON.parse(
		fs.readFileSync(dir + "/data/monstersList.json", "utf8"),
	),
};

module.exports = () => data;
