require("dotenv").config();
const Discord = require("discord.js");
const commandsList = require("./commands.json");
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
const rest = new Discord.REST({ version: "10" }).setToken(process.env.TOKEN);

async function deleteCommands() {
	console.log("deleting commands");
	rest.put(Discord.Routes.applicationCommands(process.env.ID), { body: [] });
}

async function registerCommands() {
	try {
		console.log("refreshing slash commands");
		await rest.put(Discord.Routes.applicationCommands(process.env.ID), { body: commandsList });
		console.log("successfully refreshed slash commands");
	} catch (error) {
		console.error(error);
	}
}

client.on("ready", async () => {
	await deleteCommands();
	await registerCommands();
	client.destroy();
});

client.login(process.env.TOKEN);
