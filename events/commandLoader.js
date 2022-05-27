
module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

if (interaction.isCommand()) {

            const slashCommand = client.slashCommands.get(interaction.commandName);
            if (!slashCommand) return interaction.reply("Command not found.");

            try {
                return await slashCommand.execute(client, interaction);

            } catch (err) {
                console.log(err)
                await interaction.reply({ content: "Something went wrong.", ephemeral: true });
            }
        }
    }
}