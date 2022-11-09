const {Colors} = require("discord.js/src/util/Constants");
const {SlashCommandBuilder} = require("discord.js");
const mysql = require("mysql");
const { host, user, password, database, table_name } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("allrolls")
        .setDescription("get the average rolls")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user to get avg rolls")
                .setRequired(false)
        ),

    async execute(interaction) {
        let discordUser = interaction.user;

        if(interaction.options.getUser("user") != null){
            discordUser = interaction.options.getUser("user");
        }



        var con = mysql.createConnection({ host, user, password, database });
        con.connect(function(err) {
            if (err) return interaction.reply({ content: "Error by connecting to database"})
        });

        let rolls = [];
        let rollTimes = [];

        sql = `SELECT * FROM ${table_name} WHERE userID=${discordUser.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') { void(0); }
                else { throw err;}
            }else {
                for (const resultKey in result) {
                    rolls.push(result[resultKey].roll)
                    rollTimes.push(result[resultKey].time);
                }

                if (rolls === [] || rollTimes === []) {
                    return interaction.followUp({embeds: [{description: `${discordUser} has no dice rolls`}]});
                }

                let message = "";

                for (let i = Math.max(0, rolls.length - 20); i < rolls.length; i++) {
                    message += `\n**<t:${rollTimes[i]}:D>**: **${rolls[i]}**`;
                }

                return interaction.reply({
                    embeds: [{
                        description: `${discordUser} has dice rolls:` + message
                    }]
                });
            }
            con.end()
        });
    }
};
