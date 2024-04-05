require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const allowedUserIDs = process.env.STAFF_ID.split(',');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Afficher le menu d\'aide'),
    async execute({interaction}) {
        const userRoles = interaction.member.roles.cache;
        const isAllowedUser = userRoles.some(role => allowedUserIDs.includes(role.id));
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "ALTX Bot",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTitle("‎ \nMenu d'aides");

        // Conditionnellement définir la description en fonction des permissions de modération
        if (isAllowedUser) {
            embed.setDescription(
                "> Voici mes commandes :\n\n**Modérations :**\n> - **/supp** -> Supprimer des messages\n> - **/kick** -> Expulser un membre\n> - **/ban** -> Bannir un membre\n> - **/setstatus** -> Définir le status de Sunset Bot\n\n**Tout le monde :**\n> **/help** -> Affiche le menu d'aide\n\n> **/setbirthday** -> Ajouter votre anniversaire\n\n**Autres : **\n> - **/ping** -> Commande Test (Réponds Pong)\n\nD'autres commande sont à venir 😉, vous pouvez toutes\nles consulter en tapant ' **/** ' dans le chat et choisir\n ALTX Bot 🤙"
            );
        } else {
            embed.setDescription(`> Voici mes commandes :\n\n
                > **/help** -> Affiche le menu d'aide\n\n
                > **/setbirthday** -> Ajouter votre anniversaire\n\n
                **Autres : **\n> - **/ping** -> Commande Test (Réponds Pong)\n\n
                D'autres commande sont à venir 😉, vous pouvez toutes\nles consulter en tapant ' **/** ' dans le chat et choisir \n ALTX Bot 🤙`
            );
        }

        embed.setColor("#00ff6e")
            .setFooter({
                text: "La Direction ALTX",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};