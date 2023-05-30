const fs = require('fs');
const PNG = require('pngjs').PNG;
const GIFEncoder = require('gifencoder');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('https://benisland.neocities.org/petpet/img/template.gif');


		
		console.log('GIF Compile started');
		
		// Create a new GIFEncoder instance
		const encoder = new GIFEncoder(112, 112); // Dimensions should match the PNG frames
		encoder.createReadStream().pipe(fs.createWriteStream('output/output.gif'));

		encoder.start();
		encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
		encoder.setDelay(200); // Set the delay between frames (in milliseconds)
		encoder.setQuality(10); // Set the GIF quality (1 to 30)

		// Add frames to the GIF
		addFrameToGif('images/sprite (1).png', encoder);
		addFrameToGif('images/sprite (2).png', encoder);
		addFrameToGif('images/sprite (3).png', encoder);
		addFrameToGif('images/sprite (4).png', encoder);
		addFrameToGif('images/sprite (5).png', encoder);
		// ... add more frames as needed

		encoder.finish(); // Finish encoding the GIF

		console.log('GIF saved successfully.');



		function addFrameToGif(framePath, encoder) {
			const frameData = fs.readFileSync(framePath);

			const png = PNG.sync.read(frameData);
			const frameBuffer = Buffer.alloc(png.width * png.height * 4);

			for (let y = 0; y < png.height; y++) {
				for (let x = 0; x < png.width; x++) {
					const idx = (png.width * y + x) << 2;

					// Extract the RGB values directly from the PNG data
					frameBuffer[idx] = png.data[idx]; // Red component
					frameBuffer[idx + 1] = png.data[idx + 1]; // Green component
					frameBuffer[idx + 2] = png.data[idx + 2]; // Blue component
					frameBuffer[idx + 3] = 255; // Alpha component (fully opaque)
				}
			}

			encoder.addFrame(frameBuffer);
		}
	},
};
