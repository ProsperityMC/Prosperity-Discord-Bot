import Discord from "discord.js";

export function error(title:string, message:string, channel:any) {
    // Send error to the error channel
    let embed:any = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(0xffc20b)
        .setDescription(message);
    
    channel.send({ embeds: [embed] });
}