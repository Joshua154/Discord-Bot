const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const substitutes = require("./substitutes.json");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("substitute")
        .setDescription("substitute")
        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("adds a substitute")
                .addUserOption(option =>
                    option
                        .setName("substitute")
                        .setDescription("The Peron to replace")
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option
                        .setName("replacing")
                        .setDescription("The replacing Peron")
                        .setRequired(true)
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("removes a substitute")
                .addUserOption(option =>
                    option
                        .setName("substitute")
                        .setDescription("The Peron to replace")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === "add"){
            substitutes[interaction.options.getUser("substitute").id] = interaction.options.getUser("replacing").id
        }else if (interaction.options.getSubcommand() === "remove"){
            substitutes[interaction.options.getUser("substitute").id] = null;
        }

        fs.writeFile("./substitutes.json", JSON.stringify(substitutes), err => {
            if (err) interaction.reply({ embeds: [new EmbedBuilder().setDescription("Error:\n" + err)] });
            else {
                if (interaction.options.getSubcommand() === "add"){
                    interaction.reply({ embeds: [new EmbedBuilder().setDescription(`${interaction.options.getUser("substitute")} ist ersatz für ${interaction.options.getUser("replacing")}`)] });
                }else if (interaction.options.getSubcommand() === "remove"){
                    interaction.reply({ embeds: [new EmbedBuilder().setDescription(`${interaction.options.getUser("substitute")} wurde als Ersatz entfernt.`)] });
                }
            }
        });
    }
};