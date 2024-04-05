const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setbirthday')
        .setDescription('Ajouter votre anniversaire !')
        .addStringOption(option => option
            .setName('date')
            .setDescription('La date de votre anniversaire (jj/mm/aaaa)')
            .setRequired(true)),
    async execute({ interaction }) {
        // Récupérer la date fournie en tant qu'option
        const birthdayDate = interaction.options.getString('date');

        // Vérifier si la date est au format correct (jj/mm/aaaa)
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(birthdayDate)) {
            return interaction.reply({ content: 'Veuillez entrer une date au format jj/mm/aaaa.', ephemeral: true });
        }

        // Récupérer l'ID de l'utilisateur
        const userId = interaction.user.id;

        // Charger le fichier JSON actuel
        let birthdays = {};
        try {
            const data = fs.readFileSync('birthday.json');
            birthdays = JSON.parse(data);
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier birthday.json:', error);
        }

        // Enregistrer la date d'anniversaire dans le fichier JSON
        birthdays[userId] = birthdayDate;

        // Écrire les données mises à jour dans le fichier JSON
        try {
            fs.writeFileSync('birthday.json', JSON.stringify(birthdays, null, 2));
            return interaction.reply({ content: 'Anniversaire enregistré avec succès !', ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de l\'écriture dans le fichier birthday.json:', error);
            return interaction.reply({ content: 'Une erreur s\'est produite lors de l\'enregistrement de l\'anniversaire.', ephemeral: true });
        }
    },
};
