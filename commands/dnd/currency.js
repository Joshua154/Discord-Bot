const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const currencys = {
    "gold": 20,
    "silver": 12,
    "pence": 1
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("currency")
        .setDescription("currency converter")
        .addStringOption(option =>
            option
                .setName("currency")
                .setDescription("the amount of the currency")
        ),

    async execute(interaction) {
        if(interaction.options.getString("currency") === null){ return; }
        let cur = [interaction.options.getString("currency")];


        let conditions = ["+", "-", "*"]
        let i = null;
        for (const conditionsKey in conditions) {
            if(cur.includes(conditions[conditionsKey]) && i === null){
                cur = cur[0].split(conditions[conditionsKey])
                i = conditions[conditionsKey]
            }
        }

        let gold = cur[0].split(/g|G/)[0].replace(' ', '').replace(',', '');
        let silver = cur[0].split(/g|G/)[1].split(/s|S/)[0].replace(' ', '').replace(',', '');
        let pence = cur[0].split(/g|G/)[1].split(/s|S/)[1].split(/c|C|p|P|d|D/)[0].replace(' ', '').replace(',', '');


        /*if(i !== null){
            let cgold = cur[1].split(/g|G/)[0].replace(' ', '').replace(',', '');
            let csilver = cur[1].split(/g|G/)[1].split(/s|S/)[0].replace(' ', '').replace(',', '');
            let cpence = cur[1].split(/g|G/)[1].split(/s|S/)[1].split(/c|C|p|P|d|D/)[0].replace(' ', '').replace(',', '');


            console.log(cgold, csilver, cpence)


            gold = calc(gold, cgold, i);
            silver = calc(silver, csilver, i);
            pence = calc(pence, cpence, i);

            console.log(gold, silver, pence)
        }*/



        let calcGold = 0;
        let calcSilver = 0;
        let calcPence = (gold * currencys.gold * currencys.silver) + (silver * currencys.silver) + (pence * currencys.pence);

        while ((calcPence - currencys.silver) >= 0){
            calcPence -= currencys.silver;
            calcSilver += 1;
        }
        while ((calcSilver - currencys.gold) >= 0){
            calcSilver -= currencys.gold;
            calcGold += 1;
        }


        let embed = new EmbedBuilder()
            .setTitle(`${gold} Gold, ${silver} Silver, ${pence} Pence`)
            .setDescription(`${calcGold} Gold\n${calcSilver} Silver\n${calcPence} Pence`)

        interaction.reply({embeds: [embed]})
    }
};

function calc(num1, num2, symbol){
    if(symbol === "+"){
        return num1 + num2;
    }else if(symbol === "-"){
        return num1 - num2;
    }else if(symbol === "*"){
        return num1 * num2;
    }else if(symbol === "/"){
        return num1 / num2;
    }
    return num1
}