const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const config = require('../../config.json')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('setannonce')
        .setDescription('Envoyer une annonce'),
    async execute({interaction}) {
        const annonce = interaction.guild.channels.cache.get(config.channels.annonce);

        const embed = new EmbedBuilder()
        .setAuthor({
            name: "ALTX Bot - Update",
            iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
          })
        
        .setTitle("Nouvelle Commande")
        .setDescription(`Chers membres, une novelle fonctionnalité\nma été ajoutée. Vous pouvez désormais ajouter\nvos anniversaires avec la commande :\n\`\`\`\n/setbirthday\n\`\`\`\nSi vous avez **un quelconque problème** avec \nles commandes ou que vous avez **des suggestions**\nn'hésitez pas à en faire par dans le salon <#${config.channels.faq}>`)
        .setColor("#00ff6e")
        .setFooter({
            text: "ALTX Bot",
            iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
          })
        .setTimestamp();
        interaction.reply({ content: 'Annonce envoyé', ephemeral: true });
        await annonce.send({ embeds: [embed] });
    }
};























