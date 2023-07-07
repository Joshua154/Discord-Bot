const {SlashCommandBuilder, MessageEmbed, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("magische_miesmuschel")
        .setDescription("Magische Miesmuschel"),

    async execute(interaction) {
        let rnd = Math.floor(Math.random() * 2);
        //let table = locales[interaction.locale] ?? sentences_EN;
        let table = sentences_DE;
        const embed = new EmbedBuilder()
            .setTitle(table.getSentence(rnd))
            .setThumbnail('https://static.giga.de/wp-content/uploads/2013/07/magische-miesmuschel-rcm1200x1200u.jpg')
            .setTimestamp()
        interaction.reply({embeds: [embed]})
    },
};

class sentences_EN {
    static pro = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes – definitely.",
        "You may rely on it",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes."
    ]

    static neutral = [
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again."
    ]

    static contra = [
        "Don’t count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ]

    static getTable(number){
        if(number === 0) return this.pro;
        else if(number === 1) return this.contra;
        else return this.neutral;
    }

    static getSentence(number){
        let table = this.getTable(number);
        let i = Math.floor(Math.random() * table.length);
        return table[i]
    }
}

class sentences_DE {
    static pro = [
        "Es ist sicher.",
        "Es ist definitiv so.",
        "Ohne Zweifel.",
        "Ja auf jeden Fall.",
        "Darauf kannst du dich verlassen",
        "So, wie ich es sehe, ja.",
        "Höchstwahrscheinlich.",
        "Sieht gut aus.",
        "Ja.",
        "Die Zeichen deuten auf ja."
    ]

    static neutral = [
        "Bin gerade beschäftigt.",
        "Frag später erneut.",
        "Sag ich dir nicht.",
        "Kann jetzt nicht vorhersagen.",
        "Konzentrieren und erneut fragen."
    ]

    static contra = [
        "Verlass dich nicht darauf.",
        "Meine Antwort ist nein.",
        "Meine Quellen sagen Nein.",
        "Sieht nicht gut aus.",
        "Sehr zweifelhaft."
    ]

    static getTable(number){
        if(number === 0) return this.pro;
        else if(number === 1) return this.contra;
        else return this.neutral;
    }

    static getSentence(number){
        let table = this.getTable(number);
        let i = Math.floor(Math.random() * table.length);
        return table[i]
    }
}


const locales = {
    en: sentences_EN,
    de: sentences_DE,
};
