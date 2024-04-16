import * as Discord from "discord.js";

export function playersOnline(interaction: any, errorChannel: any, errorCmd: any, auth: any) {
	// get people (probably none lmao)
	const server: string = interaction.options.getString("server");
	let responseList: any;

	fetch(`https://api.prosperitymc.net/players/${server}`, {
		headers: {
			"authorization": auth
		}
	}).then(async (response: Response) => {
		if (response.status != 200) {
			responseList =
				"There's been a server error, please try again later. If the issue persists, please let the mod team know.";
			errorCmd("Error when fetching player list", `\`\`\`\n${response}\`\`\``, errorChannel);
		} else {
			await response.json().then(async (data) => {
				if (data.length == 0) {
					responseList = "No Players Online :("; // most common one lmao
				} else {
					responseList = data.players;
				}
			});
		}
	});

	// makes it a nice list if people are actually on
	let messageDecription: string;
	if (Array.isArray(responseList)) {
		messageDecription = "```txt";
		for (let i = 0; i < responseList.length; i++) {
			messageDecription += `\n- ${responseList[i]}`;
		}
		messageDecription += `\`\`\`\nTotal of ${responseList.length} players online`;
	}

	// Makes it a fancy embed
	let embed: any = new Discord.EmbedBuilder()
		.setTitle(`Players online: ${server}`)
		.setColor(0xffc20b)
		.setDescription(responseList);
	interaction.reply({ embeds: embed });
}
