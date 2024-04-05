module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, bot) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        const command = bot.commands.get(commandName);
        if (!command) return;
        try {
            await command.execute({bot, interaction, updateCommands: bot.updateCommands});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
        }
    },
};