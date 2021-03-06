const { domainWhitelist } = require("../domainWhitelist.js");

module.exports = {
	name: "messageCreate",
	async execute(msg) {
		if (domainWhitelist.some(domain => msg.content.includes(`http://${domain}/`) || msg.content.includes(`https://${domain}/`))) {
			console.log(`Whitelisted || ${msg.author.id} | ${msg.author.username}#${msg.author.discriminator} || ${msg.content}`);
		}
		else if (msg.content.includes("http" || "https")) {
			console.log(`Warning/Delete || ${msg.author.id} | ${msg.author.username}#${msg.author.discriminator} || ${msg.content}`);
			msg.channel.deleteMessage(msg.id).catch(err => {console.log(`${err} |> Not deleted user message, check error!`);});
			msg.channel.createMessage({
				embed: {
					title: "Warning",
					description: `<@${msg.author.id}> Stop sending links!`,
					color: 0x8532D9,
					fields: [{
						name: "Support",
						value: "If you think this was a mistake open a ticket with a screenshot of the link and the reason why it should be whitelisted.",
					}],
				},
			})
				.catch(err => {console.log(err);})
				.then(async (sentMessage) => {
					// Delete warn delay (default: 6900)
					await delay(6900);
					sentMessage.delete();
				});
		}
	},
};

// Fuck it, ill delay it my self :joy:
function delay(ms) {
	return new Promise(r => setTimeout(r, ms));
}