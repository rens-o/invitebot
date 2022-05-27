const connection = require("../database/db.js")
module.exports = {
    name: "interactionCreate", async execute(interaction, client) {


        if (interaction.isButton()) {
            if (interaction.customId === "accept") {
                connection.query(`SELECT *
                                  FROM invites
                                  WHERE msg = ? `, [interaction.message.id], async (err, row) => {
                    const user = await client.users.fetch(row[0].sender, {cache: true});
                    user.send(`${interaction.user} has accepted your invite!`)
                    connection.query(`DELETE
                                      FROM invites
                                      WHERE msg = ?`, [interaction.message.id])
                })
                interaction.reply("Successfully accepted the invite! ✅")
            }
        }
    }
}