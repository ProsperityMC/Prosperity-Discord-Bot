const Discord = require("discord.js");

export function ping(client:any, interaction:any) {
    // Get needed values
    let clientPing = Date.now() - interaction.createdTimestamp;
    let wsPing = client.ws.ping != -1 ? client.ws.ping : 69;

    // Send reply
    let msgEmbed = new Discord.EmbedBuilder()
        .setColor(0xFFC20B)
        .setTitle("Pong!")
        .setDescription(`Client: ${clientPing}ms\nWeb Socket: ${wsPing}ms`);
    interaction.reply({embeds: [msgEmbed], ephemeral: true});
}