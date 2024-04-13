export function embed(interaction: any) {
	const embedText: string = interaction.options.getString("embed");
	let embed: any;
	// Parses the embed
	try {
		embed = JSON.parse(embedText);
	} catch (error) {
		interaction.reply({
			content: `There was the following error with the embed: \`\`\`\n${error}\`\`\``,
			ephemeral: true
		});
	}

	switch (interaction.options.getSubcommand()) {
		case "preview":
			// Sends privately if a preview
			interaction.reply({ embeds: [embed], ephemeral: true });
		case "post":
			// Send to channel if specified
			const channel: any = interaction.options.getChannel("channel");
			channel.send({ embeds: [embed] });
	}
}
