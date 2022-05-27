const {SlashCommandBuilder} = require('@discordjs/builders');
const discord = require("discord.js");
let fetch = require("node-fetch");
module.exports = {

    data: new SlashCommandBuilder()
        .setName('pic')
        .setDescription('Get a picture of a dog or a cat.')
        .addStringOption(option =>
            option.setName("animal")
                .setDescription("Dog or Cat")
                .setRequired(true)
                .addChoice("Dog", "dog")
                .addChoice("Cat", "cat")
        ),
    async execute(client, interaction) {
        const animal = interaction.options.getString("animal")
        fetch(`https://some-random-api.ml/animal/${animal}`)
            .then(res => res.json())
            .then(data => {

                const pic = data.image
                const desc = data.fact

            const embed = new discord.MessageEmbed()
                .setTitle(`${animal.toUpperCase()}`)
                .setImage(pic)
                .setDescription(`${desc}`)
            interaction.reply({embeds: [embed], ephemeral: true});

            });
    }

}