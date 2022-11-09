const {ButtonBuilder, ButtonStyle, EmbedBuilder, Emoji} = require("discord.js");


module.exports = {
    name: "role-button",

    button(interaction, name, rollId){
        return new ButtonBuilder()
            .setLabel(name)
            .setCustomId("role-button_" + rollId)
            .setStyle(ButtonStyle.Primary)
    },

    button(interaction, name, rollId, emojiId){
        return new ButtonBuilder()
            .setLabel(name)
            .setEmoji(emojiId)
            .setCustomId("role-button_" + rollId)
            .setStyle(ButtonStyle.Primary)
    },

    async onClick(interaction){

        let member = interaction.member;
        let roleId = interaction.customId.replaceAll("role-button_", "");

        if(member._roles.indexOf(roleId) > -1){
            member.roles.remove(roleId)
            interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Removed Role **<@&${roleId}>**`).setColor("Red")], ephemeral: true})
        }else {
            member.roles.add(roleId)
            interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Added Role **<@&${roleId}>**`).setColor("Green")], ephemeral: true})
        }
    }
}