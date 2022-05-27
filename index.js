const {Client, Intents, Collection} = require("discord.js");
const config = require("./config.json");
require("./database/db.js")
require("dotenv").config();
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});
client.slashCommands = new Collection();
['eventhandler', 'commandhandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.login(config.token);