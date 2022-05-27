const discord = require("discord.js");
const config = require("../config.json");
const connection = require("../database/db.js")
module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`${client.user.username} has successfully been deployed.`);

        client.user.setActivity(`Invites`, {type: 'WATCHING', url: 'https://discordapp.com/'});





    }
}


