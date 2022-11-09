const {SlashCommandBuilder, MessageEmbed, EmbedBuilder} = require("discord.js");
const { privateVoiceChannel } = require("../../config.json")
let count = 0;
const substitutes = require("./substitutes.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
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
        return Dice.sendEmbed(interaction);
    },
};

const Dice = {
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

            //interaction.customClient.writeToDatabse(rolluser, result, count)


            //let displayUser = interaction.guild.members.find(user => user.id === rolluser.id);
            //console.log(rolluser)
            //console.log(displayUser)
            /*let nickname = member ? member.displayName : null;
            console.log(nickname);*/
            return {title: result, description: `${first} + ${second}`, author: { name: `${rolluser.username}`, iconURL: `${rolluser.displayAvatarURL()}`}};

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
            let emb = {embeds: [Dice.roll(interaction, 0)], ephemeral};

            interaction.reply(emb);
            if (ephemeral){
                interaction.client.channels.fetch(privateVoiceChannel)
                    .then(channel => channel.send(emb));
            }
        } else {
            let message = "";

            let rolluser = interaction.user;
            if(interaction.options.getUser("user") != null){
                rolluser = interaction.options.getUser("user")
            }else {
                if(substitutes[rolluser.id] !== null && substitutes[rolluser.id] !== undefined){
                    rolluser = interaction.guild.members.cache.get(substitutes[rolluser.id])
                }
            }



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
                .setDescription(message)
                .setAuthor({ name: `${rolluser.username}`, iconURL: `${rolluser.displayAvatarURL()}`});

            let emb = {embeds: [embed], ephemeral: ephemeral};

            interaction.reply(emb);
            if (ephemeral){
                interaction.client.channels.fetch(privateVoiceChannel)
                    .then(channel => channel.send(emb));
            }
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