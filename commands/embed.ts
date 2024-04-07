export function embed(interaction:any) {
    // 
    const embedText:string = interaction.options.getString("embed");
    let embed:any;
    try {
        embed = JSON.parse(embedText);
    } catch (error) {
        interaction.reply({ content: `There was the following error with the embed: \`\`\`\n${error}\`\`\``, ephemeral: true });
    }

    switch (interaction.options.getSubcommand()) {
        case "preview":
            interaction.reply({ embeds: [embed], ephemeral: true });
        case "post":
            const channel = interaction.options.getChannel("channel");
            channel.send({ embeds: [embed] });
    }
}