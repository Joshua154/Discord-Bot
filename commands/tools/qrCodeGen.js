const { SlashCommandBuilder } = require('@discordjs/builders');
const qr = require("qrcode");
const { EmbedBuilder } = require("discord.js");
const googleAPI = require("../../util/googleQR");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('generates a QR code')
        .addStringOption(option =>
            option
            .setName('text')
            .setDescription('the string to encode')
            .setRequired(true)
        ),
    async execute(interaction) {
        qr.toString(interaction.options.getString('text'), { type: 'discord', size: 1000 }, function (err, code) {
            if (err) throw err;

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`\`\`\`${code.slice(0, -1)}\`\`\``)

            interaction.reply({ embeds: [embed], ephemeral: false });
        });

        /*const url = interaction.options.getString('text');

        await interaction.reply(googleAPI.generateQR(url));*/
    }
};