const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
      .setName("loop")
      .setDescription("Turns the music loop mode on or off."),

  async execute(interaction) {
    let client = interaction.client;
    let lang = require(`../../languages/en`);

    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: lang.msg5, ephemeral: true }).catch(e => { })

      let button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(lang.msg35)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("queue"),
        new ButtonBuilder()
          .setLabel(lang.msg36)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("nowplaying"),
        new ButtonBuilder()
          .setLabel(lang.msg37)
          .setStyle(ButtonStyle.Danger)
          .setCustomId("close")
      )

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(lang.msg38)
        .setDescription(lang.msg39)
        .setTimestamp()
      interaction.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {
        const filter = i => i.user.id === interaction.user.id
        let col = await interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

        col.on('collect', async (button) => {
          if (button.user.id !== interaction.user.id) return
          const queue1 = client.player.getQueue(interaction.guild.id);
          if (!queue1 || !queue1.playing) {
            await interaction.editReply({ content: lang.msg5, ephemeral: true }).catch(e => { })
            await button.deferUpdate();
          }
          switch (button.customId) {
            case 'queue':
              const success = queue.setRepeatMode(2);
              interaction.editReply({ content: `${lang.msg40} ✅` }).catch(e => { })
              await button.deferUpdate();
              break
            case 'nowplaying':
              const success2 = queue.setRepeatMode(1);
              interaction.editReply({ content: `${lang.msg42} ✅` }).catch(e => { })
              await button.deferUpdate();
              break
            case 'close':
              if (queue.repeatMode === 0) {
                await button.deferUpdate();
                return interaction.editReply({ content: lang.msg43, ephemeral: true }).catch(e => { })
              }
              const success4 = queue.setRepeatMode(0);
              interaction.editReply({ content: lang.msg44 }).catch(e => { })
              await button.deferUpdate();
              break
          }
        })
        col.on('end', async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setLabel(lang.msg45)
              .setCustomId("timeend")
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(lang.msg46)
            .setTimestamp()

          await interaction.editReply({ content: "", embeds: [embed], components: [button] }).catch(e => { });
        })
      }).catch(e => { })

    } catch (e) {
      if (client.errorLog) {
        let embed = new EmbedBuilder()
          .setColor('Green')
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
      return interaction.reply({ content: `${lang.error7}\n\`${e}\``, ephemeral: true }).catch(e => { })
    }
  }
}
