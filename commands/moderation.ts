export function kick(interaction: any, client: any, errorChannel: any, errorCmd: any) {
	// shoo
	const member: any = interaction.options.getUser("user");
	const reason: string = interaction.options.getString("reason") ?? "No reason given";
	let message: string;

	// get member, kick, and actually handle errors
	let guild: any = client.guilds.get("844449121376534558");
	guild.members.fetch(`${member.id}`).then(async (mb: any) => {
		mb.kick(reason)
			.then(() => {
				message += `\nUser ${member.user.username} has been kicked.`;
			})
			.catch((error: any) => {
				message += `\nWas unable to kick <@${member.id}> from the server`;
				errorCmd("Error when kicking user", `\`\`\`\n${error}\`\`\``, errorChannel);
			});
		interaction.reply({ content: message, ephemeral: true });
	});
}

export function ban(interaction: any, client: any, errorChannel: any, errorCmd: any) {
	// begone porn bot (probably)
	const member: any = interaction.options.getUser("user");
	const reason: string = interaction.options.getString("reason") ?? "No reason given";
	const deleteLen: number = interaction.options.getNumber("delete-messages") ?? 0;
	let message: string;

	// get member, kick, and actually handles errors
	const guild: any = client.guilds.get("844449121376534558");
	guild.members.fetch(`${member.id}`).then(async (mb: any) => {
		mb.ban({ days: deleteLen, reason: reason })
			.then((response: Response) => {
				message +=
					response.status == 200
						? `\nUser ${member.user.username} has been banned.`
						: `\nWas unable to ban <@${member.id}> from the server`;
			})
			.catch((error: any) => {
				message += `\nWas unable to ban <@${member.id}> from the server`;
				errorCmd("Error when banning user", `\`\`\`\n${error}\`\`\``, errorChannel);
			});
		interaction.reply({ content: message, ephemeral: true });
	});
}

export function link(interaction: any, errorChannel: any, errorCmd: any, auth: any) {
	// link discord and mc to do some 1984-type shit
	const id: any = interaction.options.getUser("discord-user").id;
	const mc: string = interaction.options.getString("mc-user");

	fetch("https://api.prosperitymc.net/link", {
		method: "POST",
		body: JSON.stringify({
			mc: mc,
			discord: id
		}),
		headers: {
			"Content-Type": "application/json",
			"authorization": auth
		}
	}).then(async (response: Response) => {
		// look a handled error!!1!1!!!!1!11!!
		interaction.reply({
			content:
				response.status == 200
					? `Successfully linked <@${id}> to '${mc}'`
					: `Unable to link <@${id}> to '${mc}'`,
			ephemeral: true
		});
		if (response.status != 200) {
			errorCmd("Error when linking accounts", `\`\`\`\n${response}\`\`\``, errorChannel);
		}
	});
}

export function errorMessage(interaction: any, config: any) {
	// i don't have console access so put errors in discord for me to read as this **will** break
	switch (interaction.options.getSubcommand()) {
		case "toggle":
			// toggle errors in discord
			config.botErrorsEnabled = !config.botErrorsEnabled;
			interaction.reply({
				content: `Toggled bot error messages to: ${config.botErrorsEnabled}`,
				ephemeral: true
			});
			break;
		case "channel":
			// set the channel
			config.botErrorChannel = interaction.options.getChannel("channel").id;
			interaction.reply({
				content: `Set bot error messages to send in <#${config.botErrorChannel}>`
			});
			break;
	}
	return config;
}
