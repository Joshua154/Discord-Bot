const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("peter")
        .setDescription("1"),

    async execute(interaction) {
        let discordUser = interaction.user;

        let embed = new EmbedBuilder()
            .setDescription(`${discordUser} du Idiot!`)

        interaction.reply({embeds: [embed]})
    }
};