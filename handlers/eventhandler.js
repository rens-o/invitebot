const fs = require("fs");
module.exports = (client) => {

    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
        console.log(`Event: ${event.name} has loaded...`);
    }

}