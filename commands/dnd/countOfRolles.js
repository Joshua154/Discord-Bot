const {Colors} = require("discord.js/src/util/Constants");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const mysql = require('mysql');
const { host, user, password, database, table_name } = require("../../config.json")
const Multiset = require("../../util/Multiset");

let mes = []

module.exports = {
    data: new SlashCommandBuilder()
        .setName("numrolls")
        .setDescription("get the number of a specific roll")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user to get rolls")
                .setRequired(false)
        )
        .addNumberOption(option =>
            option
                .setName("number")
                .setDescription("The number to get rolls")
                .setRequired(false)
        ),

    async execute(interaction) {
        let discordUser = interaction.user;

        let bool = false;

        if(interaction.options.getUser("user") != null){
            if(interaction.options.getUser("user") === interaction.user){
                bool = true
            }

            discordUser = interaction.options.getUser("user");
        }

        var con = mysql.createConnection({ host, user, password, database });
        con.connect(function(err) {
            if (err) return interaction.reply({ content: "Error by connecting to database"})
        });

        let rolls = [];

        let sql = `SELECT * FROM ${table_name} WHERE userID=${discordUser.id}`;

        if(bool){
            sql = `SELECT * FROM ${table_name}`;
        }

        con.query(sql, function (err, result) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') { void(0); }
                else { throw err;}
            }else {
                for (const resultKey in result) {
                    rolls.push(result[resultKey].roll)
                }

                if (rolls === []) {
                    return interaction.followUp({embeds: [{description: `${discordUser} has no dice rolls`}]});
                }

                let counts = new Multiset();

                for (const rollsKey in rolls) {
                    counts.add(rolls[rollsKey]);
                }

                //counts.forEach(logMapElements)

                let sorted = new Map([...counts.entries()].sort((a, b) => b[1] - a[1]));

                sorted.forEach(logMapElements)

                let finalMes = "";

                for (let i = 0; i < Math.min(mes.length, 5); i++) {
                    if(interaction.options.getNumber("number") !== null && mes[i].contains(`${interaction.options.getNumber("number")}:`)){
                        finalMes += mes[i];
                    }else if(interaction.options.getNumber("number") === null){
                        finalMes += mes[i];
                    }
                }

                let embed = new EmbedBuilder()
                    .setTitle("Number of specific Rolles")
                    .setDescription(finalMes)
                    .setAuthor({ name: `${discordUser.username}`, iconURL: `${discordUser.displayAvatarURL()}`})
                    .setTimestamp(Date.now())

                return interaction.reply({
                    embeds: [embed]
                });
            }
            con.end()
        });
    }
};

function logMapElements(value, key, map) {
    mes.push(`${key}: ${value}\n`)
}