const client = require("../index.js")
const { EmbedBuilder, Events } = require('discord.js');
//const Dice = require("../util/Dice.js")


client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()){
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            interaction.customClient = client.test;
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    else if (interaction.isContextMenu()){
        await interaction.deferReply({ ephemeral: false });
        const contextMenu = client.contextMenus.get(interaction.commandName);
        if (!contextMenu) return;

        try {
            await contextMenu.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }
    else if (interaction.isButton()){
        if (interaction.customId.match(/(option)([12345])/i)){
            prosesOption(interaction);
        }
        /*else if (interaction.customId.match(/(diceButton_)/i)){
            let arg = interaction.customId.split("_")[1]
            console.log(arg)
            if(arg === "dice"){
                interaction.reply(Dice.getEmbed(false, 1, interaction.user))
            }
        }*/
    }
    else if (interaction.isSelectMenu()){
        const SelectMenuName = client.selectMenu.get(interaction.customId);
        if (!SelectMenuName) return

        try {
            await SelectMenuName.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

function prosesOption(interaction){
    const db = client.db.get(`polls.p${interaction.message.id}`)
    if (interaction.createdTimestamp > db.endDate) {
        let fields = []
        for (let i = 1; i < 5; i++) {
            if(db[`option${i}`]!== undefined){
                fields.push({ name: db[`option${i}`], value: `${db[`option${i}_votes`]}`})
            }
        }

        const embed = new EmbedBuilder()
            .setTitle(`[Over] ${db['question']}`)
            .setColor("#ff0000")
            .addFields(fields)

        interaction.message.edit({embeds: [embed]})
        return interaction.reply({
            content: `Vote is over`,
            ephemeral: true
        })
    }
    if(db.members.includes(interaction.user.id)){
        return interaction.reply({
            content: `You already voted`,
            ephemeral: true
        })
    }
    client.db.push(`polls.p${interaction.message.id}.members`, interaction.user.id)
    for (let i = 1; i < 5; i++) {
        if(db[`option${i}`] !== undefined){
            if(interaction.customId === `option${i}`){
                client.db.add(`polls.p${interaction.message.id}.option${i}_votes`, 1)
            }
        }
    }
    interaction.reply({
        content: `Your choice was saved`,
        ephemeral: true
    })
}