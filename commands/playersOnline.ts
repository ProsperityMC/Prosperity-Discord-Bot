const Discord = require("discord.js");

export function playersOnline(interaction:any) {
    const server = interaction.options.getString("server");
    let responseList:any;

    fetch(`https://api.prosperitymc.net/players/${server}`)
        .then(async (response) => {
            if (response.status != 200) {
                responseList = "There's been a server error, please try again later. If the issue persists, please let the mod team know."
            } else {
                await response.json().then(async (data) => {
                    if (data.length == 0) {
                        responseList = "No Players Online :(";
                    } else {
                        responseList = data.players;
                    }
                });
            }
        });

    let messageDecription:string;
    if (Array.isArray(responseList)) {
        messageDecription = "```txt";
        for (let i = 0; i < responseList.length; i++) {
            messageDecription += `\n- ${responseList[i]}`;
        }
        messageDecription += `\`\`\`\nTotal of ${responseList.length} players online`
    }

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Players online: ${server}`)
        .setColor(0xFFC20B)
        .setDescription(responseList);
    interaction.reply({ embeds: embed });
}