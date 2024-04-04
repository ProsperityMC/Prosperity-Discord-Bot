require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});
import * as commands from "./commands/index";
import { BaseInteraction } from "discord.js"

// Command Run Loop
client.on('interactionCreate', async (interaction:BaseInteraction) => {
    if (!interaction.isChatInputCommand()) { return; }

    console.log(commands.ping)

    // Add commands here
    switch (interaction.commandName) {
        case "ping":
            await commands.ping(client, interaction);
            break;
        default:
            interaction.reply("How the fuck did you get this message");
    }
})

// Run when ready
client.on('ready', async () => {
    //await registerSlashCommands();

    console.log(`logged in as ${client.user.tag}`);
})

// Login
client.login(process.env.TOKEN);