require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
    console.log('Ricky is online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message.content }],
        });

        message.reply(response.choices[0].message.content.trim());
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        message.reply('Sorry, an error occurred while processing your request.');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
