const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');

const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		console.log('GIF Compile started');
		
		// Create a new GIFEncoder instance
		const encoder = new GIFEncoder(112, 112); // Dimensions should match the JPEG frames
		const output = fs.createWriteStream('output/output.gif');

		encoder.createReadStream().pipe(output);
		
		encoder.start();
		encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
		encoder.setDelay(40); // Set the delay between frames (in milliseconds)
		encoder.setQuality(10); // Set the GIF quality (1 to 30)

		// Add frames to the GIF
		await addFrameToGif('images/sprite (1).jpg', encoder);
		await addFrameToGif('images/sprite (2).jpg', encoder);
		await addFrameToGif('images/sprite (3).jpg', encoder);
		await addFrameToGif('images/sprite (4).jpg', encoder);
		await addFrameToGif('images/sprite (5).jpg', encoder);
		// ... add more frames as needed

		encoder.finish(); // Finish encoding the GIF

		await new Promise((resolve) => {
			output.on('finish', resolve);
		});

		console.log('GIF saved successfully.');



		const file = new AttachmentBuilder('output/output.gif', 'image/gif');

		console.log("SUCCESS HERE");

		const exampleEmbed = new EmbedBuilder()
			.setTitle('Some title')
			.setImage('attachment://output.gif');

		console.log('SUCCESS TWO, ELECTRIC BOOGALOO');

		await interaction.reply({
			content: 'Test Message',
			embeds: [exampleEmbed],
			files: [file]
		});



		async function addFrameToGif(framePath, encoder) {
			const frameImage = await loadImage(framePath);
			const canvas = createCanvas(frameImage.width, frameImage.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(frameImage, 0, 0);
			const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

			const frameBuffer = Buffer.alloc(canvas.width * canvas.height * 4);

			for (let i = 0; i < frameData.length; i += 4) {
				const idx = i >> 2;
				frameBuffer[i] = frameData[i]; // Red component
				frameBuffer[i + 1] = frameData[i + 1]; // Green component
				frameBuffer[i + 2] = frameData[i + 2]; // Blue component
				frameBuffer[i + 3] = 255; // Alpha component (fully opaque)
			}

			encoder.addFrame(frameBuffer);
		}
	},
};




/*
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
// ...
const file = new AttachmentBuilder('../assets/discordjs.png');
const exampleEmbed = new EmbedBuilder()
	.setTitle('Some title')
	.setImage('attachment://discordjs.png');

channel.send({ embeds: [exampleEmbed], files: [file] });

*/













/*const fs = require('fs');
const PNG = require('pngjs').PNG;
const GIFEncoder = require('gifencoder');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		console.log('GIF Compile started');
		
		// Create a new GIFEncoder instance
		const encoder = new GIFEncoder(112, 112); // Dimensions should match the PNG frames
		encoder.createReadStream().pipe(fs.createWriteStream('output/output.gif'));

		encoder.start();
		encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
		encoder.setDelay(40); // Set the delay between frames (in milliseconds)
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



		const file = 'output/output.gif';

		await interaction.reply({
			content: 'Test Message',
			files: [file]
		});



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
};*/