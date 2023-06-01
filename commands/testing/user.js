const https = require('https');
const fs = require('fs');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('get user info')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('the profile to steal')
				.setRequired(true)),
	async execute(interaction) {


		const target = interaction.options.getUser('target');

		console.log(target);

		/*const exampleEmbed = new EmbedBuilder()
			.setTitle('Some title')
			.setImage(target.user.avatarURL());
		*/

		await interaction.reply({
			content: target.avatarURL()
		});



		const file = fs.createWriteStream("output/" + target.username + ".webp");
		const request = https.get(
			target.avatarURL(),
			function(response) {
				response.pipe(file);

				// after download completed close filestream
				file.on("finish", () => {
				file.close();
				console.log("Download Completed");
			});
		});

	},
};