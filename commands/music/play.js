const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a track.")
        .addSubcommand(command =>
            command
                .setName("normal")
                .setDescription("Open music from other platforms.")
                .addStringOption(option =>
                option
                    .setName("name")
                    .setDescription('Write your music name.')
                    .setRequired(true)
                )
        ),
    async execute(interaction) {
        let client = interaction.client;
        let lang = require(`../../languages/en`);

        try {
            let stp = interaction.options.getSubcommand()

            if (stp === "normal") {
                const name = interaction.options.getString('name')
                if (!name) return interaction.reply({ content: lang.msg59, ephemeral: true }).catch(e => { })

                await interaction.reply({ content: lang.msg61 }).catch(e => { })
                try {
                    const queue = client.player.getQueue(interaction.guild.id);

                    await client.player.play(interaction.member.voice.channel, name, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction
                    })
                    if(!queue || !queue.playing){
                        const queue = client.player.getQueue(interaction.guild.id);
                        queue.setVolume(10)
                    }
                } catch (e) {
                    await interaction.editReply({ content: lang.msg60, ephemeral: true }).catch(e => { })
                }
            }
        } catch (e) {
            if (client.errorLog) {
                let embed = new EmbedBuilder()
                    .setColor(client.config.embedColor)
                    .setTimestamp()
                    .addFields([
                        { name: "Command", value: `${interaction?.commandName}` },
                        { name: "Error", value: `${e.stack}` },
                        { name: "User", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
                        { name: "Guild", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\``, inline: true },
                        { name: "Time", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                        { name: "Command Usage Channel", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
                        { name: "User Voice Channel", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
                    ])
                await client.errorLog.send({ embeds: [embed] }).catch(e => { })
            } else {
                console.log(`
                    Command: ${interaction?.commandName}
                    Error: ${e}
                    User: ${interaction?.user?.tag} (${interaction?.user?.id})
                    Guild: ${interaction?.guild?.name} (${interaction?.guild?.id})
                    Command Usage Channel: ${interaction?.channel?.name} (${interaction?.channel?.id})
                    User Voice Channel: ${interaction?.member?.voice?.channel?.name} (${interaction?.member?.voice?.channel?.id})
                `)
            }
            return interaction.editReply({ content: `${lang.error7}`, ephemeral: true }).catch(e => { })
        }
    }
};
