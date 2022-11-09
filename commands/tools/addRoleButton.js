const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder} = require('discord.js');
const buttonTemplate = require("../../buttons/buttonRoles/role-button")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role_button')
        .setDescription('creates a message with buttons for roles')
        .addSubcommand(option =>
            option
                .setName('add')
                .setDescription('add a role to select')
                .addRoleOption(option => option.setName('role1').setDescription('role').setRequired(true))
                .addRoleOption(option => option.setName('role2').setDescription('role'))
                .addRoleOption(option => option.setName('role3').setDescription('role'))
                .addRoleOption(option => option.setName('role4').setDescription('role'))
                .addRoleOption(option => option.setName('role5').setDescription('role'))
                .addBooleanOption(option => option.setName('singleoption').setDescription('only one option'))
        )
        .addSubcommand(option =>
            option
                .setName('remove')
                .setDescription('removes a role to select')
                .addRoleOption(option => option.setName('role').setDescription('role').setRequired(true))
        ),
    async execute(interaction) {
        //const roles = interaction.options.getRole('role');

        /*if(interaction.options.getSubcommand() === 'add'){
            let buttons = interaction.client.db.get(`button_roles.${interaction.guild.id}`) ?? {};



        }else if(interaction.options.getSubcommand() === 'remove'){

        }*/

        const components = []

        for (let i = 1; i < 6; i++) {
            const roles = interaction.options.getRole('role' + i);

            if(roles) components.push(buttonTemplate.button(interaction, roles.name, roles.id, ':male_sign:'))
        }


        interaction.reply({ components: [new ActionRowBuilder()
                .addComponents(components)]})
    },
};
