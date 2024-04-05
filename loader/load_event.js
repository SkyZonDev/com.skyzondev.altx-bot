const fs = require('fs');
const path = require('path');

module.exports = async bot => {
    const eventsFolder = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsFolder).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(path.join(eventsFolder, file));
        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args, bot));
        } else {
            bot.on(event.name, (...args) => event.execute(...args, bot));
        }
    }
};
