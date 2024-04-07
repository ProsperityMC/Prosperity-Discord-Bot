const Discord = require("discord.js");

export function kick(interaction:any, client:any) {
    const member = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "No reason given";

    let message:any;
    fetch("https://api.prosperitymc.net/kick", {
        method: "POST",
        body: JSON.stringify({
            id: `${member.id}`
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        if (response.status != 200) {
            message = "There was a server error, carbon pls fix (just remember to do it on the servers)";
        } else {
            message = "Successfully removed from the whitelists.";
        }
    });

    let guild:any = client.guilds.get("844449121376534558");
    guild.members.fetch(`${member.id}`).then(async () => {
        guild.members.kick(`${member.id}`, reason).then(() => {
            message += `\nUser ${member.user.username} has been kicked.`;
        }).catch(() => {
            message += `\nWas unable to kick <@${member.id}> from the server`;
        });
    });
    interaction.reply({ content: message, ephemeral: true });
}

export function ban(interaction:any, client:any) {
    const member = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "No reason given";

    let message:any;
    fetch("https://api.prosperitymc.net/ban", {
        method: "POST",
        body: JSON.stringify({
            id: `${member.id}`
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        if (response.status != 200) {
            message = "There was a server error, carbon pls fix (just remember to do it on the servers)";
        } else {
            message = "Successfully removed from the whitelists and put on banlist.";
        }
    });

    let guild:any = client.guilds.get("844449121376534558");
    guild.members.fetch(`${member.id}`).then(async () => {
        guild.members.ban(`${member.id}`, reason).then(() => {
            message += `\nUser ${member.user.username} has been banned.`;
        }).catch(() => {
            message += `\nWas unable to ban <@${member.id}> from the server`;
        });
    });
    interaction.reply({ content: message, ephemeral: true });
}