import fs from "fs";
import { getRandomInt, uniqueId } from "./lib.mjs";

const __dirname = import.meta.dirname;
const total = 10;
const playerNames = [
	"Никита",
	"Алексей",
	"Макс",
	"Егор",
	"Наташа",
	"Алена",
	"Константин Константинопольский",
];
const charNames = [
	"Арагорн",
	"Араторн",
	"Тальхур Даэдэлот",
	"Адрие Динэн",
	"Вонана Ворн",
	"Йенифер",
	"Нейромонах Феофан",
	"Фродо",
	"Сэм",
	"Ыть",
];
const charArr = new Array(total).fill({});

try {
	fs.writeFileSync(
		__dirname + "/data/characters.json",
		JSON.stringify(
			charArr.map(() => ({
				id: uniqueId(),
				armor: getRandomInt(100),
				avatar: "",
				campaignId: getRandomInt(5),
				dateCreated: Date.now(),
				dateUpdated: Date.now(),
				health: getRandomInt(100),
				name: charNames[getRandomInt(charNames.length - 1)],
				playerName: playerNames[getRandomInt(playerNames.length - 1)],
			})),
		),
	);
	// file written successfully
} catch (err) {
	console.error(err);
}
