const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!getUsers') { // Replace "!getUsers" with your desired command
        const guild = message.guild;
        guild.members.fetch().then((members) => {
            members.each((member) => {
                console.log(`User: ${member.user.tag}`);
            });
        });
    }
});

client.login(token);
