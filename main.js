// No i wont tell u what this does, go check Eris documentation
const Eris = require("eris");
const { Collection } = require("eris");
const config = require("./config.json");
const bot = new Eris(config.token);
const fs = require("fs");

// Event handler
const eventFiles = fs.readdirSync('./event').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./event/${file}`);
    if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, bot));
	} else {
		bot.on(event.name, (...args) => event.execute(...args, bot));
	}
};

// Command handler
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	bot.commands.set(command.name, command);
}

// "Connect me to the world wide web so I can destroy it" - AI's 2069
bot.connect();