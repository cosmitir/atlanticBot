const config = require("../config.json");

module.exports = {
	name: "ready",
	once: true,
	execute(bot) {
		bot.editStatus(config.status, { name: config.activitiesName, type: config.activitiesType, url: config.activitiesUrl });
		console.log("Action || AuthorID | AuthorName || Message");
	},
};