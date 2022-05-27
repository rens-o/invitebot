const {SlashCommandBuilder} = require('@discordjs/builders');
const connection = require("../database/db.js")
const discord = require("discord.js")
let map = new Map();
module.exports = {

    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Send a user an invite.')
        .addMentionableOption(option => option.setName("user")
            .setDescription("User")
            .setRequired(true)), async execute(client, interaction) {

        const user = interaction.options.getMentionable("user")

        const embed = new discord.MessageEmbed()
            .setTitle("New Invite!")
            .setDescription(`You got invited by ${interaction.user.username + "#" + interaction.user.discriminator}.`)
            .setTimestamp()

        const row1 = new discord.MessageActionRow()
            .addComponents(new discord.MessageButton()
                    .setCustomId("accept")
                    .setLabel("Accept")
                    .setStyle("SUCCESS")
                    .setEmoji("✅"),

                new discord.MessageButton()
                    .setCustomId("deny")
                    .setLabel("Deny")
                    .setStyle("SECONDARY")
                    .setEmoji("❌"))

        const checkUser = interaction.user.username + user.id

        if (map.has(checkUser)) return interaction.reply({
            content: "You have already sent an invite to this user within the past 5 minutes. Please try again later.",
            ephemeral: true
        })

        if (user.user.bot) return interaction.reply({content: "You can't invite bots.", ephemeral: true})

        connection.query(`SElECT * FROM invites WHERE sender = ? AND receiver = ?`, [interaction.user.id, user.id], async(err, row) =>{

            if (row.length !== 0) return interaction.reply({
                content: `You have already sent an invite to ${user}.`,
                ephemeral: true
            })


        interaction.reply({content: `Successfully sent an invite to ${user}.`, ephemeral: true})
        await user.createDM().then(chan => {
            chan.send({embeds: [embed], components: [row1]}).then(msg => {
                connection.query(`INSERT INTO invites (sender, receiver, msg)
                                  VALUES ('${interaction.user.id}', '${user.id}', '${msg.id}')`, err => {
                    if (err) throw err;
                })
            })
        })
        map.set(checkUser, interaction.user.id)
        setTimeout(() => {
            map.delete(checkUser)
        }, 60 * 1000);

        })
    }

}