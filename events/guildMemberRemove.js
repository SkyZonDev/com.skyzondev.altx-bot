const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member) {
        const logChannel = member.guild.channels.cache.get(config.channels.log);
        if (!logChannel) return;

        // Créer un message d'au revoir
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'CLSCRP Bot',
                iconURL: 'https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&',
            })
            .setTitle('‎\n Un utilisateur à quitter le serveur :')
            .setDescription(`**Tag**  : ${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('#f00000')
            .setFooter({
                text: 'La Direction',
                iconURL: 'https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&',
            })
            .setTimestamp();

        // Envoyer le message d'au revoir dans le canal de log
        logChannel.send({ embeds: [embed] });
    },
};
