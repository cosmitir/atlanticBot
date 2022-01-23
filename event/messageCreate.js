const { domainWhitelist } = require("../domainWhitelist.js");

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
/*
        // Ignore all bots
        if (client.author.bot) return;

        // Ignore messages not starting with the prefix (in config.json)
        if (msg.content.indexOf(config.prefix) !== 0) return;

        // Our standard argument/command name definition.
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        const cmd = bot.commands.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        // Run the command
        cmd.run(bot, msg, args);
*/
        if (domainWhitelist.some(domain => msg.content.includes(`http://${domain}/`) || msg.content.includes(`https://${domain}/`))) {
            console.log(`Whitelisted || ${msg.author.id} | ${msg.author.username}#${msg.author.discriminator} || ${msg.content}`);
        } else if (msg.content.includes("http" || "https")) {
            console.log(`Warning/Delete || ${msg.author.id} | ${msg.author.username}#${msg.author.discriminator} || ${msg.content}`);
            msg.channel.deleteMessage(msg.id).catch(err => {console.log(`${err} |> Not deleted user message, check error!`)});
            msg.channel.createMessage({
                embed: {
                    title: "Warning",
                    description: `<@${msg.author.id}> Stop sending links!`,
                        color: 0x8532D9,
                        fields: [{
                                name: "Support",
                                value: "If you think this was a mistake open a ticket with a screenshot of the link and the reason why it should be whitelisted.",
                        }]
                }
            })
            .catch(err => {console.log(err)})
            .then(async (sentMessage) => {
                await delay(6900); // Delete warn delay (default: 6900)
                sentMessage.delete();
            });
        }
	},
};

// Fuck it, ill delay it my self :joy:
function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
};