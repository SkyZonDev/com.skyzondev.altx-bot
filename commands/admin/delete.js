const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('supp')
    .setDescription('Supprimer des messages')
    .addIntegerOption(option =>
        option.setName('nombre')
            .setDescription('Le nombre de messages à supprimer')
            .setRequired(true)
    ),
    async execute({interaction}) {
        const amount = interaction.options.get('nombre').value;

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            await interaction.reply("Vous n'avez pas la permission de gérer les messages.");
            return;
        }

        if (amount <= 0 || amount > 100) {
            await interaction.reply("Le nombre de messages à supprimer doit être compris entre 1 et 100.");
            return;
        }

        await interaction.channel.bulkDelete(amount);
        const response = await interaction.reply(`J'ai supprimé ${amount} messages.`);

        setTimeout(() => {
            response.delete();
        }, 2000);
    },
};
