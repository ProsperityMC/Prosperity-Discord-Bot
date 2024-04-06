require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});
let config = require("./config.json");
import * as commands from "./commands/index";
import { BaseInteraction } from "discord.js"

// Command Run Loop
client.on('interactionCreate', async (interaction:BaseInteraction) => {
    if (!interaction.isChatInputCommand()) { return; }

    console.log(commands.ping)

    // Add commands here
    // Yes this is fuck ugly but it's better than checking if a file exists and then loading it every time
    switch (interaction.commandName) {
        case "ping":
            commands.ping(client, interaction);
            break;
        case "github":
            commands.github(interaction);
            break;
        case "god-armor":
            commands.godArmor(interaction);
            break;
        case "hibye":
            commands.hiBye(interaction);
            break;
        case "map":
            commands.map(interaction);
            break;
        case "spacebar":
            commands.spacebar(interaction);
            break;
        case "specs":
            commands.specs(interaction);
            break;
        case "tryit":
            commands.tryit(interaction);
            break;
        case "world-age":
            commands.worldAge(interaction);
            break;
        case "bot-info":
            commands.botInfo(interaction);
            break;
        case "seed":
            commands.seed(interaction);
            break;
        case "welcome":
            config = commands.welcomeMessage(interaction, config);
            break;
        case "leave":
            config = commands.leaveMessage(interaction, config);
            break;
        default:
            interaction.reply("How the fuck did you get this message");
    }
})

// Run when someone joins the server
client.on('guildMemberAdd', async (member:any) => {
    // Get channel to send welcome message in 
    let channel = member.guild.channels.cache.get(`${config.joinMsgChannel}`);
    if (!channel || !config.joinMsgEnabled) {
        // If invalid, log error unless it's -1 as that's the janky-ass way to disable this shit
        console.log(config.joinMsgEnabled ? "invalid channel id" : "join msg disabled");
        return;
    }

    let msgToSub = "";
    if (config.isJoinEmbed) {
        msgToSub = config.joinMsg.description;
    } else {
        msgToSub = config.joinMsg;
    }

    // Both can only be equal if at same position, which is fucking impossible, or if both are not found (i.e. both return -1)
    if (msgToSub.indexOf('{') == msgToSub.indexOf('}')) {
        // If you didn't customise the join message like a fucking monster
        channel.send(msgToSub);
        return;
    }
    // Value substitution
    let subStart = -1;
    for (let i = 0; i < msgToSub.length; i++) {
        if (msgToSub == '{') { // Start of field to substitute
            subStart = i; 
            continue; 
        } 
        else if (msgToSub != '}') { continue; } // If not needed
        else if (subStart == -1) { continue; } // If no substitution needed
        // End of bit to substitute
        let subValue = "";
        switch (msgToSub.slice(subStart+1, i)) { // Add substitution values here
            case "user":
                subValue = `<@${member.user.id}>`;
        }
        if (subValue != "") {
            msgToSub.replace(msgToSub.slice(subStart, i+1), subValue);
        }
        subStart = -1;
    }

    // Send message
    if (!config.isJoinEmbed) {
        channel.send(msgToSub);
        return;
    }
    // If embed
    let embed = config.joinMsg;
    embed.description = msgToSub;
    channel.send({ embeds: [embed] });
})

// Run when someone leaves the server
client.on('guildMemberRemove', async (member:any) => {
    // Get channel to send leave message in 
    let channel = member.guild.channels.cache.get(`${config.leaveMsgChannel}`);
    if (!channel || !config.leaveMsgEnabled) {
        // If invalid, log error unless it's -1 as that's the janky-ass way to disable this shit
        console.log(config.leaveMsgEnabled ? "invalid channel id" : "leave msg disabled");
        return;
    }

    let msgToSub = "";
    if (config.isLeaveEmbed) {
        msgToSub = config.leaveMsg.description;
    } else {
        msgToSub = config.leaveMsg;
    }

    // Both can only be equal if at same position, which is fucking impossible, or if both are not found (i.e. both return -1)
    if (msgToSub.indexOf('{') == msgToSub.indexOf('}')) {
        // If you didn't customise the join message like a fucking monster
        channel.send(msgToSub);
        return;
    }
    // Value substitution
    let subStart = -1;
    for (let i = 0; i < msgToSub.length; i++) {
        if (msgToSub == '{') { // Start of field to substitute
            subStart = i; 
            continue; 
        } 
        else if (msgToSub != '}') { continue; } // If not needed
        else if (subStart == -1) { continue; } // If no substitution needed
        // End of bit to substitute
        let subValue = "";
        switch (msgToSub.slice(subStart+1, i)) { // Add substitution values here
            case "user":
                subValue = `<@${member.user.username}>`;
        }
        if (subValue != "") {
            msgToSub.replace(msgToSub.slice(subStart, i+1), subValue);
        }
        subStart = -1;
    }

    // Send message
    if (!config.isLeaveEmbed) {
        channel.send(msgToSub);
        return;
    }
    // If embed
    let embed = config.leaveMsg;
    embed.description = msgToSub;
    channel.send({ embeds: [embed] });
})

// Run when ready
client.on('ready', async () => {
    //await registerSlashCommands();

    console.log(`logged in as ${client.user.tag}`);
})

// Login
client.login(process.env.TOKEN);