const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const config = {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    owner: process.env.OWNER,
    guild: process.env.GUILD_ID,
}
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const intents = [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates];
const bot = new Client({intents: intents});
const activity = {
    name: 'de réfléchir à son fonctionnement',
    type: ActivityType.Playing,
};


// Fontion ---------------
async function updateCommands(collection, clientId, token) {
    const commands = collection.map(command => command.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        // Envoyer les nouvelles commandes à Discord
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

// Chargement du Bot ----------------
module.exports = { updateCommands };

bot.commands = new Collection();
bot.updateCommands = updateCommands;
const loadCommands = require("./loader/load_commands")
const loadEvent = require("./loader/load_event")
loadCommands(bot)
loadEvent(bot)



// Interaction Bot -----------------
bot.once('ready', async () => {
    console.log(`Connecté en tant que ${bot.user.tag}`);
    bot.user.setActivity(activity)
    updateCommands(bot.commands, bot.user.id, bot.token)
});
bot.on('reconnecting', () => {
    console.log('Reconnecting!');
});
bot.on('disconnect', () => {
    console.log('Disconnect!');
});
bot.on('error', console.error);

// Login bot -------------
bot.login(config.token)