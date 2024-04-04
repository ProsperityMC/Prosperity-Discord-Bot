const Discord = require("discord.js");
const commandsList = require("./commands.json");

const rest = new Discord.REST({ version: '10' }).setToken(process.env.TOKEN);
try {
    console.log("refreshing slash commands");
    for (let i = 0; i < commandsList.length; i++) {
        let cmd = commandsList[i]
        rest.post(Discord.Routes.applicationCommands(process.env.ID), {body: cmd});
    }
} catch (error) {
    console.error(error);
}