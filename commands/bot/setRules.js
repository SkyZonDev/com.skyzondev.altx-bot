const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require('discord.js');
require('dotenv').config();

var version = "-- v1.0.0";
module.exports = {
    data : new SlashCommandBuilder()
        .setName('setrules')
        .setDescription('Envoyé le règlement'),
    async execute({interaction}) {
        const ticket = interaction.guild.channels.cache.get(process.env.SE_TICKET);
        const rules = interaction.guild.channels.cache.get(process.env.SE_REGLEMENT);

        const embed = new EmbedBuilder()
            .setAuthor({
                name: version,
            })
            .setTitle("Règlement - ALTX")
            .setDescription(`Bienvenue sur **Chicago LakeshoreRP** ! Pour garantir une expérience agréable et respectueuse pour tous nos membres, nous vous prions de lire attentivement et de respecter les règles suivantes. La violation de ces règles peut entraîner des avertissements, des mesures disciplinaires et, dans certains cas, des exclusions.\n\n**1. Respect et tolérance :**\n> Soyez poli et respectueux envers tous les membres, quelles que soient leurs opinions, leurs origines, leur sexe, leur orientation sexuelle, leur âge, ou leur religion. \n> Évitez les insultes, le harcèlement, la discrimination, le discours de haine, et toute forme de comportement toxique.\n\n**2. Contenu approprié :**\n> Évitez de publier du contenu offensant, obscène, pornographique, illégal, ou tout autre contenu inapproprié. \n> Le langage vulgaire est autorisé dans la limite du raisonnable, mais n'oubliez pas que la courtoisie est de mise.\n\n**3. Respect de la vie privée :**\n> Ne partagez pas d'informations personnelles d'autres membres sans leur consentement. \n> Ne publiez pas de liens, de photos ou de vidéos contenant des informations privées de tiers.\n\n**4. Spam et publicité :**\n> Évitez le spam, le flood ou la publicité non autorisée. \n> Les messages promotionnels ne sont autorisés que dans le canal prévu à cet effet (généralement \"self promotion\").\n\n**5. Respect du contenu :**\n> Obtenez la permission de l'auteur avant de publier, partager ou distribuer tout contenu créé par quelqu'un d'autre (images, vidéos, textes, etc.).\n\n**6. Utilisation des salons :**\n> Utilisez les canaux de manière appropriée en fonction de leur objet. \n> Évitez le hors sujet dans les canaux de discussion spécifiques.\n\n**7. Signalement des infractions :**\n> Si vous constatez une infraction aux règles, signalez là à l'équipe de modération en fournissant des captures d'écran et des informations détaillées.\n\n**8. Mesures disciplinaires :**\n> Les modérateurs peuvent avertir, exclure temporairement ou définitivement les membres qui enfreignent les règles, en fonction de la gravité de l'infraction. \n> Les décisions de l'équipe de modération sont finales.\n\n**9. Contenu du serveur :**\n> Tout contenu publié sur le serveur (texte, images, vidéos, etc.) appartient au serveur et peut être modifié ou supprimé par les modérateurs.\n\n**10. Modification du règlement :**\n> Ce règlement peut être modifié à tout moment. Les membres en seront informés, et il leur incombe de le lire régulièrement. En rejoignant Chicago LakeshoreRP, vous acceptez de respecter ce règlement. \n> Nous vous remercions de contribuer à maintenir un environnement agréable et respectueux pour tous.\n\nVous avez à votre disposition le salon ${ticket} si vous avez une quelconque questions où besoin d'aide\n\n**La Direction** et **Le Staff** de CLSRP vous souhaite de passer un bon moment avec nous 🎅`)
            .setImage("https://cdn.discordapp.com/attachments/1171655244808212492/1171703198403276891/standard.gif?ex=655da4a3&is=654b2fa3&hm=2316721c306af8b8a5cd317a3694302e59bba2db82572766ec255d3d5482d463&")
            .setColor("#00b0f4")
            .setFooter({
                text: "La Direction CLSRP",
                iconURL: "https://cdn.discordapp.com/attachments/1171655244808212492/1171656991106662480/CLSRP_Bot_dark.png?ex=655d799b&is=654b049b&hm=a7464ab30dcc13b5d021fb1724defcf3de675f9a9483926f59b09630cb81b9b5&",
            })
            .setTimestamp();
        const acceptBtn = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("accept").setLabel("Accepter") //.setEmoji("✅");
        const rejectBtn = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("reject").setLabel("Rejeter") //.setEmoji("❌");
        const row = new ActionRowBuilder().addComponents(acceptBtn, rejectBtn);
        await rules.send({ embeds: [embed] });
        const response = await rules.send({ components: [row] });

        const filter = (i) => i.user.id === interaction.user.id;

        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
        });
        collector.on("collect", async (interaction) => {
            if (interaction.customId === "accept") {
                const reply = await interaction.reply({ content: "Règlement accepté", ephemeral: true });
                const roleID = process.env.ACP_REG;
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    interaction.member.roles.add(role);
                }
                await response.delete();
                setTimeout(async () => {
                    await reply.delete();
                }, 4000);
            } else if (interaction.customId === "reject") {
                const reply = await interaction.reply({ content: "Règlement rejeté", ephemeral: true });
                const roleID = process.env.RJT_REG;
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    interaction.member.roles.add(role); 
                }
                await response.delete();
                setTimeout(async () => {
                    await reply.delete();
                }, 4000);
            }
        });










        collector.on("collect", async (interaction) => {
            if (interaction.customId === "accept") {
                // Retirer le bouton "Accepter"
                acceptBtn.setDisabled(true);
                rejectBtn.setDisabled(true);
                row.addComponents(acceptBtn);
        
                const roleID = process.env.ACP_REG;
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    interaction.member.roles.add(role);
                }

                await interaction.reply({ content: "Règlement rejeté", ephemeral: true });
                // Ajouter le bouton "Modifier"
                const modifyBtn = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId("modify").setLabel("Modifier");
                row.addComponents(modifyBtn);
        
                await interaction.update({ components: [row] });
            } else if (interaction.customId === "reject") {
                rejectBtn.setDisabled(true);
                acceptBtn.setDisabled(true);
                row.addComponents(rejectBtn);
                const roleID = process.env.RJT_REG;
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    interaction.member.roles.add(role);
                }
                await interaction.reply({ content: "Règlement rejeté", ephemeral: true });
                await response.delete();
            } else if (interaction.customId === "modify") {
                // Gérer la modification du choix ici
                // Par exemple, vous pouvez renvoyer un message pour permettre à l'utilisateur de revoir et de changer sa décision.
                await interaction.reply({ content: "Vous pouvez maintenant modifier votre choix." });
            }
        });
        
        
    }
};