const {SlashCommandBuilder, MessageEmbed, EmbedBuilder} = require("discord.js");
let count = 0;
const substitutes = require("./substitutes.json");
//const client = require("../../index.js");
const Dice = require("../../util/Dice.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("body_part")
        .setDescription("rolls a dice test")
        .addIntegerOption(option =>
            option
                .setName("times")
                .setDescription("number of times to roll the dice")
                .setRequired(false)
        )
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("user to roll for")
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option
                .setName("private")
                .setDescription("roll the dice privately")
                .setRequired(false)
        ),

    async execute(interaction) {
        return Dice.sendEmbed(interaction, "bodyPart");
    },
};

/*const Dice = {
    roll(interaction, count) {
        try {
            let first = this.rollDice(10);
            let second = this.rollDice(10);

            if (first === 10) {
                first = 0;
            }
            if (second === 10) {
                second = 0;
            }

            var result = first * 10 + second;

            if (result === 0) {
                result = 100;
                first = 10;
                second = 10;
            }


            let rolluser = interaction.user;
            if(interaction.options.getUser("user") != null){
                rolluser = interaction.options.getUser("user")
            }else {
                if(substitutes[rolluser.id] !== null && substitutes[rolluser.id] !== undefined){
                    rolluser = interaction.guild.members.cache.get(substitutes[rolluser.id])
                }
            }

            let finalString = "Error"
            if(result <= 9){
                finalString = "Head"
            }else if(result <= 24){
                finalString = "Left Arm"
            }else if(result <= 44){
                finalString = "Right Arm"
            }else if(result <= 79){
                finalString = "Body"
            }else if(result <= 89){
                finalString = "Left Leg"
            }else if(result <= 100){
                finalString = "Right Leg"
            }



            //interaction.customClient.writeToDatabse(rolluser, result, count)

            return {title: finalString, description: `${result} <- ${first} + ${second}`, author: { name: `${rolluser.username}`, iconURL: `${rolluser.displayAvatarURL()}`}};

        } catch (e) {
            return {title: "Error", description: "Invalid dice roll:\n" + e};
        }
    },
    rollDice(diceroll) {
        return Math.floor(Math.random() * diceroll) + 1;
    },
    async sendEmbed(interaction) {
        let ephemeral = interaction.options.getBoolean("private") ?? false;
        if (interaction.options.getInteger("times") <= 1) {
            interaction.reply({embeds: [Dice.roll(interaction, 0)], ephemeral});
        } else {
            let message = "";

            for (let i = 0; i <= interaction.options.getInteger("times") - 1; i++) {
                if (i > 0) {
                    message += ",\n"
                }

                message += "**" + Dice.roll(interaction, i).title + "**";
                count += 1;
            }

            count = 0;

            let embed = new EmbedBuilder()
                .setTitle(`Rolled ${interaction.options.getInteger("times")} times`)
                .setDescription(message);

            interaction.reply({embeds: [embed], ephemeral: ephemeral});
        }
    }
}

/*var sql = "INSERT INTO " + table_name + " (username, userID, guildName, guildID, status, Activity, activityType, state) VALUES ('" + newMember.user.username + "', '" + newMember.user.id + "', '" + newMember.guild.name + "', '" + newMember.guild.id + "', '" + newMember.status + "', '" + acName + "', '" + acType + "', '" + acState + "')";
    con.query(sql, function (err, result) {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') { void(0); }
            else { throw err;}
        }
        con.end()
    });*/