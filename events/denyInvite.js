const connection = require("../database/db.js")
module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {


        if (interaction.isButton()) {
            if (interaction.customId === "deny") {
                connection.query(`SELECT *
                                  FROM invites
                                  WHERE msg = ? `, [interaction.message.id], async (err, row) => {
                    console.log(row[0].sender)
                    const sender = row[0].sender
                    const user = await client.users.fetch(sender, { cache: true });
                    user.send(`${interaction.user} has denied your invite.`)

                    connection.query(`DELETE
                                      FROM invites
                                      WHERE msg = ?`, [interaction.message.id])

                })
                interaction.reply("Successfully denied the invite.")
            }
        }
    }
}