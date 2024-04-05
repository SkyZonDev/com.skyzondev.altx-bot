const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "guildMemberAdd",
    once: false, 
    execute(member) {
        const bienvenueChannel = member.guild.channels.cache.get(config.channels.bienvenue);
        const reglesChannel = member.guild.channels.cache.get(config.channels.reglement);
        const log_channel = member.guild.channels.cache.get(config.channels.log)
          
        if (!bienvenueChannel || !reglesChannel) return;
        // Ajouter le rôle "Touriste" au membre
        const roleID = config.roles.touriste;
        const role = member.guild.roles.cache.get(roleID);
        if (role) {
            member.roles.add(role)
                .then(() => {
                    console.log(`Le rôle "Touriste" a été ajouté à ${member.displayName}`);
                })
                .catch((error) => {
                    console.log(`Erreur lors de l'ajout du rôle "Touriste" à ${member.displayName}: ${error}`);
                });
        }
        const embed_bienvenue = new EmbedBuilder()
            .setAuthor({
                name: "CLSCRP Bot",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTitle("‎ \n Bienvenue 👋")
            .setDescription(`> Bienvenue à toi <@${member.id}> ! Nous sommes heureux de t'accueillir à **Chicago Lakeshore CityRP**.\n\n> Va faire un tour ici ${reglesChannel}.\n> J'espère que la ville te plaira et nous te souhaitons de passer un bon moment parmi nous. 😉`)
            .setImage("https://cdn.discordapp.com/attachments/1171655244808212492/1171657074887884890/Bann_CLSRP_dark.png?ex=655d79ae&is=654b04ae&hm=04a1b5f1a1d7022a9cf1fd37c6d219bea7be6b8721b67fbe25fc8dad809f23e8&")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor("#00ff6e")
            .setFooter({
                text: "La Direction",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTimestamp();

        const embed_log = new EmbedBuilder()
            .setAuthor({
                name: "CLSCRP Bot",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTitle("‎ \n Un nouvel utilisateur à rejoint :")
            .setDescription(`**Tag**  : <@${member.id}>\n\n\`\`\`json\nid = ${member.id}\ncreatedAt = ${member.joinedAt}\n\`\`\``)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor("#00ff6e")
            .setFooter({
                text: "La Direction",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTimestamp();

        bienvenueChannel.send({ embeds: [embed_bienvenue] });
        log_channel.send({embeds: [embed_log]});
    },
};
