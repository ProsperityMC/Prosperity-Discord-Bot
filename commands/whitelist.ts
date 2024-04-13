export function whitelist(interaction: any, errorChannel: any, errorCmd: any) {
	const mc: string = interaction.options.getString("mc-user");
	const id: any = interaction.options.getUser("discord-user").id;
	const subCmd: string = interaction.options.getSubcommand();

	if (mc == id) {
		// i.e. they're both null which means there's no one to fucking remove from the wl because the person running the command is a dipshit
		interaction.reply({ content: "Both parameters can't be null dumbass", ephemeral: true });
		return;
	}

	fetch(`https://api.prosperitymc.net/whitelist/${subCmd}`, {
		method: "POST",
		body: JSON.stringify({
			mc: mc,
			discord: id
		}),
		headers: {
			"Content-Type": "application.json"
		}
	}).then(async (response: Response) => {
		// All cases handled, like a semi-professional programmer
		let message: string;
		if (subCmd == "add" && response.status == 200) {
			message = `Successfully added '${mc}' to the whitelist${
				id != null ? `(Linked to <@${id}>)` : ""
			}.`;
		} else if (subCmd == "add") {
			message = `There was a problem when adding '${mc}' to the whitelist.`;
			errorCmd("Error adding to the whitelist", `\`\`\`\n${response}\`\`\``, errorChannel);
		} else if (response.status == 200) {
			message = `Successfully removed ${mc != null ? `'${mc}'` : `<@${id}>`} from the whitelist.`;
		} else {
			message = `Error when removing ${mc != null ? `'${mc}'` : `<@${id}>`} from the whitelist`;
			errorCmd("Error removing from the whitelist", `\`\`\`\n${response}\`\`\``, errorChannel);
		}
		interaction.reply({ content: message, ephemeral: true });
	});
}
