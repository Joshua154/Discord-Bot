const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db_out')
        .setDescription('Get Results from Database')
        .addStringOption(option => option
            .setName('question')
            .setDescription('question to query')
            .setRequired(false)
        ).addStringOption(option => option
            .setName('topic')
            .setDescription('topic to query')
            .setRequired(false)
        ),
    async execute(interaction) {
        var out = "";
        var options = interaction.options.getString('question') || interaction.options.getString('topic');
        for (const pollsKey in interaction.client.db.get('polls')) {
            var str = interaction.client.db.get(`polls.${pollsKey}`);

            if(options)
            {
                if ((interaction.options.getString('question') === str.question) || (interaction.options.getString('topic') === str.topic)) {
                    out += `${str.question}     ${str.topic}:${getOptions(str)}\n\n`;
                }
            }
            else{ out += `${str.question}     ${str.topic}:${getOptions(str)}\n\n`; }
        }
        await interaction.reply({ content: out ? `\`\`\`${out.substr(0, 2000)}\`\`\`` : 'Error', ephemeral: true });
    }
};

function getOptions(str) {
    var strArr = [str.option1, str.option2, str.option3, str.option4, str.option5];
    var strVotesArr = [str.option1_votes, str.option2_votes, str.option3_votes, str.option4_votes, str.option5_votes];
    var optionsStr = "";
    for (var i = 0; i < 5; i++) {
        if(strArr[i] !== undefined) {
            optionsStr += `\n     Option${i + 1}: ${strArr[i]}    Votes: ${strVotesArr[i]}`;
        }
    }
    return optionsStr;
}