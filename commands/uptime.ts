const Discord = require("discord.js");

export async function uptime(interaction: any, startTime: number) {
	const server: string = interaction.options.getString("service");
	let uptime: any;

	if (server == "bot") {
		uptime = Date.now() - startTime;
	} else {
		// Gets response from API. 400 Bad Request should never happen as I've limited the choices but it's handled in case(tm) because i *try* to be a good programmer
		fetch(`https://api.prosperitymc.net/uptime/${server}`).then(async (response) => {
			if (response.status == 400) {
				uptime = -1;
			} else if (response.status != 200) {
				uptime = -2;
			} else {
				await response.json().then(async (data) => {
					uptime = Date.now() - data.time;
				});
			}
		});
	}

	let uptimeStr: string;
	if (uptime == -1) {
		uptimeStr = "This shouldn't be fucking possible";
	} else if (uptime == -2) {
		uptimeStr =
			"There's been a server error, please try again later. If the issue persists, please let the mod team know.";
	} else {
		uptimeStr = `${uptime}`;
	}

	let embed = new Discord.EmbedBuilder()
		.setColor(0xffc20b)
		.setTitle(`Uptime for ${server}`)
		.setDescription(`\`${uptimeStr}\``);

	interaction.reply({ embed: [embed], ephemeral: true });
}
