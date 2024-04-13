import dotenv from "dotenv";
import Discord from "discord.js";
import commandsList from "./commands.json";

dotenv.config();

const token = process.env.TOKEN || "";
const id = process.env.ID || "";
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
const rest = new Discord.REST({ version: "10" }).setToken(token);

async function deleteCommands() {
	console.log("deleting commands");
	rest.put(Discord.Routes.applicationCommands(id), { body: [] });
}

async function registerCommands() {
	try {
		console.log("refreshing slash commands");
		await rest.put(Discord.Routes.applicationCommands(id), { body: commandsList });
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

client.login(token);
