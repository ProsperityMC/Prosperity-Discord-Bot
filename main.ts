require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});
const commands = require("./commands.json");

// Register slash commands
registerSlashCommands();

// Command Run Loop
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) { return; }

    // Add commands here
    if (interaction.commandName == 'ping') { interaction.reply('pong'); }
})

// Run when ready
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

// Login
client.login(process.env.TOKEN);

async function registerSlashCommands() {
    const rest = new Discord.REST({version: '10'}).setToken(process.env.TOKEN);
    try {
        console.log("refreshing slash commands");
        await rest.put(Discord.Routes.applicationCommands(process.env.ID), {body: commands});
    } catch (error) {
        console.error(error);
    }
}