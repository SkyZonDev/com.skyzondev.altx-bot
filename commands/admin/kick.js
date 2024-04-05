const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
function suppMsg(interaction) {
    setTimeout(() => {
        interaction.channel.bulkDelete(1);
    }, 4000);
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick un utilisateur du serveur')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur à kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison du ban')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute({ interaction }) {
        const user = interaction.options.get('utilisateur').user;
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
        const log_channel = interaction.guild.channels.cache.get(config.channels.log);

        const embed_log = new EmbedBuilder()
            .setTitle("Kick membre")
            .setDescription(`**Tag**  : <@${user.id}>\n\`\`\`json\nid = ${user.id}\n\`\`\`\n**Raison :**\n>>> ${reason}`)
            .setColor("#ffcc29")
            .setFooter({
                text: interaction.user.username, // Pseudo de celui qui kick
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }), // Avatar de celui qui kick
            })
            .setTimestamp();
        const embed_mp = new EmbedBuilder()
            .setTitle("Vous avez été kick de : \nALTX")
            .setDescription(`**Pour le(s) motif(s) suivant(s): **\n> ${reason}\n\n**Si vous n'êtes pas d'accord avec ceci,\nmerci de bien vouloir nous contacter \nà l'adresse mail suivante :**\n\`\`\`json\nskyzondev@gmail.com\n\`\`\``)
            .setThumbnail("https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&")
            .setColor("#00b0f4")
            .setFooter({
              text: "La direction ALTX",
              iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirmButton')
                    .setLabel('Confirmer')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('cancelButton')
                    .setLabel('Annuler')
                    .setStyle(ButtonStyle.Danger),
            );

        await interaction.reply({ embeds: [embed_log], components: [row] });

        const filter = i => {
            i.deferUpdate();
            return i.customId === 'confirmButton' || i.customId === 'cancelButton';
        };

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'confirmButton') {
                await user.send({ embeds: [embed_mp] });
                await interaction.guild.members.kick(user, { reason });
                await log_channel.send({ embeds: [embed_log] });
                await interaction.editReply(`L'utilisateur ${user.tag} a été kick pour la raison : ${reason}`);
                suppMsg(interaction);
            } else if (i.customId === 'cancelButton') {
                await interaction.editReply('Le kick a été annulée.');
                suppMsg(interaction);
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply('La commande a expiré. Veuillez réessayer.');
                suppMsg(interaction);
            }
        });
    },
};
