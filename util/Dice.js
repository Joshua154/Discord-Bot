const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    roll(user, count) {
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


            let rolluser = user;

            //interaction.customClient.writeToDatabse(rolluser, result, count)

            //let displayUser = interaction.guild.members.find(user => user.id === rolluser.id);
            //console.log(rolluser)
            //console.log(displayUser)
            /*let nickname = member ? member.displayName : null;
            console.log(nickname);*/
            return {
                title: result,
                //description: `${first} + ${second}`,
                author: {
                    name: `${rolluser.username}`,
                    iconURL: `${rolluser.displayAvatarURL()}`
                }
            };

        } catch (e) {
            return {title: "Error", description: "Invalid dice roll:\n" + e};
        }
    },
    rollDice(diceroll) {
        return Math.floor(Math.random() * diceroll) + 1;
    },
    getEmbed(ephemeral, times, user) {
        if (times <= 1) {
            return {embeds: [this.roll(user, 0)], ephemeral};
        } else {
            let message = "";

            for (let i = 0; i <= times - 1; i++) {
                if (i > 0) {
                    message += ",\n"
                }
                message += "**" + this.roll(user, i).title + "**";
            }

            let embed = new EmbedBuilder()
                .setTitle(`Rolled ${times} times`)
                .setDescription(message)
                .setAuthor({name: `${user.username}`, iconURL: `${user.displayAvatarURL()}`});

            return {embeds: [embed], ephemeral: ephemeral};
        }
    },
    getRow(type) {
        return new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('diceButton_' + type.toLowerCase())
                    .setLabel(type)
                    .setStyle(ButtonStyle.Success),
            )
    },
    async sendEmbed(interaction) {
        let user = interaction.user;
        if(interaction.isCommand() && interaction.options.getUser("user") !== null){
            user = interaction.options.getUser("user");
        }

        let emb = this.getEmbed(interaction.options.getBoolean("private") ?? false, interaction.options.getInteger("times"), user)

        interaction.reply({embeds: emb.embeds, ephemeral: emb.ephemeral, components: [this.getRow("Dice")]})
        let ephemeral = interaction.options.getBoolean("private") ?? false;
        /*if (ephemeral){
            interaction.client.channels.fetch(privateVoiceChannel)
                .then(channel => channel.send(emb));
        }*/
    }
}