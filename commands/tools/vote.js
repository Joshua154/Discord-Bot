const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('description')
        .addStringOption(option=>
            option
                .setName('title')
                .setDescription('Title of the Poll')
                .setRequired(true))
        .addStringOption(option=>
            option
                .setName('topic')
                .setDescription('Topic of the Poll')
                .setRequired(true))
        .addNumberOption(option=>
            option
                .setName('time')
                .setDescription('Time until Poll ends')
                .setRequired(true))
        .addStringOption(option=>
            option
                .setName('time_type')
                .setDescription('Type of Time Duration')
                .setRequired(true)
                .addChoices({ name: 'days', value: 'day'},
                    { name: 'hours', value: 'hour'},
                    { name: 'minutes', value: 'minute'},
                    { name: 'seconds', value: 'second'}))
        .addStringOption(option =>
            option
                .setName('option1')
                .setDescription('Option 1 to vote')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option2')
                .setDescription('Option 2 to vote')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option3')
                .setDescription('Option 3 to vote'))
        .addStringOption(option =>
            option
                .setName('option4')
                .setDescription('Option 4 to vote'))
        .addStringOption(option =>
            option
                .setName('option5')
                .setDescription('Option 5 to vote'))
        .addBooleanOption(option=>
            option
                .setName('thread')
                .setDescription('Want to start a Thread?'))
        .addChannelOption(option=>
            option
                .setName('channel')
                .setDescription('Channel to start Poll')),
    async execute(interaction) {
        let poll = {
            question: interaction.options.getString('title'),
            topic: interaction.options.getString('topic'),
            option1: interaction.options.getString('option1'),
            option1_votes: 0,
            option2: interaction.options.getString('option2'),
            option2_votes: 0,
            option3: interaction.options.getString('option3') ?? undefined,
            option3_votes: 0,
            option4: interaction.options.getString('option4') ?? undefined,
            option4_votes: 0,
            option5: interaction.options.getString('option5') ?? undefined,
            option5_votes: 0,
            members: [],
            startDate: interaction.createdTimestamp,
            endDate: (interaction.createdTimestamp + interaction.options.getNumber('time') * convertTimeType(interaction.options.getString('time_type'))),
            thread: interaction.options.getBoolean('thread') ?? false,
            channel: interaction.options.getChannel('channel') ?? interaction.channel
        }
        let components = []
        for (let i = 1; i < 5; i++) {
            if(poll[`option${i}`] !== undefined){
                let style = ButtonStyle.Primary;
                if (poll[`option${i}`].toLowerCase() === 'yes' || poll[`option${i}`].toLowerCase() === 'ja'){
                    style = ButtonStyle.Success
                }else if (poll[`option${i}`].toLowerCase() === 'no' || poll[`option${i}`].toLowerCase() === 'nein'){
                    style = ButtonStyle.Danger
                }

                components.push(
                    new ButtonBuilder().setLabel(`${poll[`option${i}`]}`).setStyle(style).setCustomId(`option${i}`)
                )
            }
        }

        const embed = new EmbedBuilder().setTitle(interaction.options.getString('title'))
            .setDescription(interaction.options.getString('topic'))
            .setColor("#ff0000")
            .addFields({ name: "Poll end", value: `<t:${~~(poll.endDate/1000)}:T> (<t:${~~(poll.endDate/1000)}:R>)`})


        let row = new ActionRowBuilder().addComponents(components);

        const channel = await poll.channel;
        const message = await channel.send({ embeds: [embed], components: [row] })

        await interaction.client.db.set(`polls.p${message.id}`, poll)
        interaction.reply({content: `Poll created:\nhttps://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`, ephemeral: true})

        if(poll.thread){
            message.startThread({name: `[Discuss Poll] ${poll.question.substr(0, 20)}`})
                .then(async (thread)=>{
                    thread.send(`${interaction.user}`).then((m) => m.delete())
                    thread.send(`Vote here: https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                })
        }
    }
};

function convertTimeType(type){
    //return type==='s' ? 1000 : type==='m' ? 1000*60 : type==='h' ? 1000*60*60 : 1000*60*60*24
    let temp = 0
    switch (type){
        case 'second':
            temp=1000
            break;
        case 'seconds':
            temp=1000
            break;

        case 'minute':
            temp=1000*60
            break;
        case 'minutes':
            temp=1000*60
            break;

        case 'hour':
            temp=1000*60*60
            break;
        case 'hours':
            temp=1000*60*60
            break;

        case 'day':
            temp=1000*60*60*24
            break;
        case 'days':
            temp=1000*60*60*24
            break;
    }
    return temp;
}