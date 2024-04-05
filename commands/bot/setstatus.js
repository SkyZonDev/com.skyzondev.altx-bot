const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Changer le statut du Sunset Bot')
        .addStringOption(option =>
            option.setName('activite')
                .setDescription('Activité du Bot')
                .setRequired(true)
                .addChoices(
                    {name: 'Joue', value: 'Playing'},
                    {name: 'Regarde', value: 'Watching'},
                    {name: 'Écoute', value: 'Listening'},
                    {name: 'Diffuse en direct', value: 'Streaming'},
                    {name: 'Compétition', value: 'Competing'}
                )
        )
        .addStringOption(option =>
            option.setName('status')
                .setDescription('Status du Bot')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('lien')
                .setDescription('URL du Stream')
                .setRequired(false)
        ),
    async execute({interaction}) {
        const activity = interaction.options.getString('activite');
        const status = interaction.options.getString('status');

        if (activity !== 'Playing' && activity !== 'Watching' && activity !== 'Listening' && activity !== 'Streaming' && activity !== 'Competing') return interaction.reply("Merci de suivre l'autocomplete.");

        if(activity === "Streaming" && interaction.options.getString("lien") === null) return interaction.reply("Indiquer une url");
        if(activity === "Streaming" && !interaction.options.getString("lien").match(new RegExp(/(?:https:\/\/)?twitch\.tv\/(\S+)/i))) return interaction.reply("Indiquer une url Twitch");
        if(activity === "Streaming") await interaction.client.user.setActivity(status, { type: Discord.ActivityType[activity], url: interaction.options.getString("lien")});
        else await interaction.client.user.setActivity(status, { type: Discord.ActivityType[activity]});
        return interaction.reply(`Le statut du bot a été mis à jour !`);
    },
};
