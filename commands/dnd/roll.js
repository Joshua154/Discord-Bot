const {SlashCommandBuilder} = require("discord.js");
const Dice = require('dice-notation-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("rolls a dice")
        .addStringOption(option =>
            option
                .setName("diceroll")
                .setDescription("The dice to roll")
                .setRequired(true)
        ),

    async execute(interaction) {
        let input = interaction.options.getString("diceroll")
        try{
            if(input.includes("x")){
                let temp = input.split("x")
                input = temp[0]

                let message = "**";
                for (let i = 0; i < parseInt(temp[1]); i++) {
                    if(i < parseInt(temp[1]) && i !== 0){
                        message += "**,\n**";
                    }

                    message += Dice.detailed(input).result;
                }
                message += "**"
                interaction.reply({
                    embeds: [{
                        title: interaction.options.getString("diceroll"),
                        description: message
                    }]
                });
            }else {
                let roll = Dice.detailed(input);
                interaction.reply({
                    embeds: [{
                        title: roll.result,
                        description: "**" + input + "**\n" + (roll.result - roll.modifier) + " <- " + roll.rolls + "\nModifier: " + (0 + roll.modifier)
                    }]
                });
            }

        }catch (e){
            console.log(e)
            return interaction.reply({embeds: [{ title: "Error"}] });
        }
    }
};