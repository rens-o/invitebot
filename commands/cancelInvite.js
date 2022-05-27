const {SlashCommandBuilder} = require('@discordjs/builders');
const connection = require("../database/db.js")
module.exports = {

    data: new SlashCommandBuilder()
        .setName('cancelinvite')
        .setDescription('Cancel an invite.')
        .addMentionableOption(option =>
            option.setName("user")
                .setDescription("User")
                .setRequired(true)
        ),
    async execute(client, interaction) {

        const user = interaction.options.getMentionable("user")
        connection.query(`SElECT *
                          FROM invites
                          WHERE receiver = ${user.id}
                            AND sender = ${interaction.user.id}`, (err, row) => {
            if (row.length <= 0) return interaction.reply({
                content: `You have not sent an invite to ${user}.`, ephemeral: true
            })

            try {
                user.createDM().then((channel)=>{
                    channel.messages.delete(row[0].msg)
                })


                connection.query(`DELETE
                                  FROM invites
                                  WHERE receiver = ${user.id}
                                    AND sender = ${interaction.user.id}`)

                interaction.reply({content: `Successfully cancelled your invite to ${user}.`, ephemeral: true})
            } catch (error) {
                console.log(error)
                return interaction.reply({content: `An error ocurred.`, ephemeral: true})
            }


        })


    }

}