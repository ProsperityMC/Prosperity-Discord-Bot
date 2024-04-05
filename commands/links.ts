const Discord = require("discord.js");

export function github(interaction:any) {
    interaction.reply({ content: "Find us on GitHub at: https://github.com/ProsperityMC", ephemeral: true});
}

export function godArmor(interaction:any) {
    interaction.reply({ content: "Link to god armor (written by yours truly): https://blog.mrmelon54.com/post/2023/07/29/god-armor", ephemeral: true });
}

export function hiBye(interaction:any) {
    let embed = new Discord.EmbedBuilder()
        .setColor(0xFFC20B)
        .setImage('https://tenor.com/view/simpsons-bart-simpson-grampa-simpson-old-man-hi-bye-gif-8390063');
    interaction.reply({ embeds: [embed] });
}

export function map(interaction:any) {
    interaction.reply({ content: "Find the live map here: https://map.prosperitymc.net", ephemeral: true });
}

export function spacebar(interaction:any) {
    interaction.reply({ content: "The\nenter\nkey\nis\nnot\na\nspacebar" });
}

export function specs(interaction:any) {
    let embed = new Discord.EmbedBuilder()
        .setColor(0xFFC20B)
        .setImage('https://tenor.com/view/2b2t-gif-24920862');
    interaction.reply({ embeds: [embed] });
}

export function tryit(interaction:any) {
    let embed = new Discord.EmbedBuilder()
        .setColor(0xFFC20B)
        .setImage('https://tryitands.ee');
    interaction.reply({ embeds: [embed] });
}

export function worldAge(interaction:any) {
    interaction.reply({ content: "We have been playing on this world since <t:1624610820:f>"});
}

export function botInfo(interaction:any) {
    interaction.reply({ content: "Made with hopes, dreams, and a ton of caffeine - find the source code at: https://github.com/ProsperityMC/Prosperity-Discord-Bot"})
}