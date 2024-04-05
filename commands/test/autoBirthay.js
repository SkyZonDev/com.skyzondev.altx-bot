const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
require('dotenv').config
function calculateAge(birthdate) {
    const today = new Date();
    const birthdateArray = birthdate.split('/');
    const birthYear = parseInt(birthdateArray[2], 10);
    const birthMonth = parseInt(birthdateArray[1], 10) - 1;
    const birthDay = parseInt(birthdateArray[0], 10);

    let age = today.getFullYear() - birthYear;
    
    if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        age--;
    }

    return age;
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbirthday')
        .setDescription('Tester anniversaire !'),
    async execute({ interaction, bot }) {
        const channel = interaction.guild.channels.cache.get(config.channels.cmd_direction);
        let birthdays = {};
        try {
            const data = fs.readFileSync('birthday.json');
            birthdays = JSON.parse(data);
        } catch (error) {
            console.log('Erreur lors de la lecture du fichier birthday.json:', error);
            return;
        }
        const guild = bot.guilds.cache.get(process.env.GUILD_ID);
        if (!guild) {
            console.log('Serveur introuvable.');
            return;
        }
        const members = guild.members.cache;

        for (const userId in birthdays) {
            const birthdayDate = birthdays[userId];
            const user = members.get(userId);

            if (user) {
                const today = new Date();
                const userBirthday = new Date(today.getFullYear(), parseInt(birthdayDate.split('/')[1]) - 1, parseInt(birthdayDate.split('/')[0]));
                
                if (today.getMonth() === userBirthday.getMonth() && today.getDate() === userBirthday.getDate()) {
                    const age = calculateAge(birthdayDate)
                    const embed_anniv = new EmbedBuilder()
                        .setAuthor({
                        name: "CLSRP Bot - Anniversaire 🎁",
                        iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
                        })
                        .setTitle("Aujourd'hui est un jour spécial !")
                        .setDescription(`Aujourd'hui <@${userId}> à **${age} ans !!!!!**\n**Joyeux Anniversaire 🎈🎉🎉**\n\nDésolé pour toi mais j'ai pas de cadeau\nà t'offrir, de un parce que je suis juste un \nprogramme informatique et de deux parce que \nje suis un gros radin. Mais t'inquiète tu es \ndans mon cœur ou plutôt mon ***birthday.json*** 😉😂`)
                        .setColor("#00ff6e")
                        .setFooter({
                        text: "CLSRP Bot",
                        iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
                        })
                        .setTimestamp();
                    channel.send({embeds: [embed_anniv] });
                }
            }
        }
        interaction.reply('Vérification manuelle des anniversaires effectuée.');
    },
};