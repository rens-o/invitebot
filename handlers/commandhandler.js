const fs = require("fs");
const slashCommands = [];
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const config = require("../config.json");

module.exports = async (client) => {

    const commandSlashFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

    for (const fileSlash of commandSlashFiles) {

        const commandSlash = require(`../commands/${fileSlash}`);

        client.slashCommands.set(commandSlash.data.name, commandSlash);
        slashCommands.push(commandSlash.data.toJSON());

        console.log(`Command: ${commandSlash.data.name} has loaded...`);

    }


    const rest = new REST({version: '9'}).setToken(config.token);


    try {

        await rest.put(Routes.applicationCommands(config.clientID), {
            body: client.slashCommands.map(command => {
                return command.data.toJSON()
            })
        },);

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

}

