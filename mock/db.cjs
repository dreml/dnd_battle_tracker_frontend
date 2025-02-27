const fs = require("fs");

const dir = __dirname;
const data = {
	monsters: JSON.parse(
		fs.readFileSync(dir + "/data/monstersFull.json", "utf8"),
	),
	characters: JSON.parse(
		fs.readFileSync(dir + "/data/characters.json", "utf8"),
	),
};

module.exports = () => data;
