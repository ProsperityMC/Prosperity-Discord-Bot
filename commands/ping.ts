import Discord from "discord.js";

export function ping(client:any, interaction:any) {
    // Get needed values
    let clientPing:number = Date.now() - interaction.createdTimestamp;
    let wsPing:number = client.ws.ping != -1 ? client.ws.ping : 69;

    // Send reply
    let msgEmbed:any = new Discord.EmbedBuilder()
        .setColor(0xFFC20B)
        .setTitle("Pong!")
        .setDescription(`Client: ${clientPing}ms\nWeb Socket: ${wsPing}ms`);
    interaction.reply({embeds: [msgEmbed], ephemeral: true});
}