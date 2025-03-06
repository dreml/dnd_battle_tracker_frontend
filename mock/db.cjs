const fs = require("fs");

const dir = __dirname;
const data = {
	monsters: JSON.parse(
		fs.readFileSync(dir + "/data/monstersFull.json", "utf8"),
	),
	characters: JSON.parse(
		fs.readFileSync(dir + "/data/characters.json", "utf8"),
	),
	campaigns: JSON.parse(fs.readFileSync(dir + "/data/campaigns.json", "utf8")),
	battleTemplates: JSON.parse(
		fs.readFileSync(dir + "/data/battleTemplates.json", "utf8"),
	),
};

module.exports = () => data;
