const fs = require('fs');
const path = require('path');

module.exports = async bot => {
    const commandFolders = fs.readdirSync('./commands').filter(folder => fs.statSync(path.join('./commands', folder)).isDirectory());
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join('./commands', folder)).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join('../commands', folder, file));
            bot.commands.set(command.data.name, command);
            console.log(`La commande ${command.data.name} a été chargée avec succès | Dossier : ${folder}`);
        }
    }
};