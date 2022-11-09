const {SlashCommandBuilder, MessageEmbed, EmbedBuilder} = require("discord.js");
const { host, user, password, database, table_name } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("current_player")
        .setDescription("select")
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("channel")
                .setRequired(false)
        ),

    async execute(interaction) {
        let channel = interaction.options?.getChannel('channel');
        console.log(channel)
        if(channel === null){
            channel = interaction.member;
        }
        console.log(channel)
        if(channel === null || channel === undefined){
            return interaction.reply({ content: "Error", ephemeral: true });
        }

        for (const memberKey in channel.members) {
            console.log(channel.members[memberKey])
        }
    },
};