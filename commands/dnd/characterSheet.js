const {SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require("discord.js");
const fs = require('fs');
const {writeFile} = require('fs');
const wait = require('node:timers/promises').setTimeout;
const Dice = require('dice-notation-js');
const https = require("https");
const campaignsPath = "./storage/campaigns"
const __storage = "F:/js/newDiscordBot/storage"

const campaigns = [
    { name: "Thorsten", value: 'thorsten' },
    { name: "Peter", value: 'peter' },
    { name: "Jonas", value: 'jonas' }
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("character_sheet")
        .setDescription("Character Sheet Command")
        .addSubcommand(subcommandGroup =>
            subcommandGroup
                .setName("save")
                .setDescription("saves a Character Sheet")
                .addStringOption(option =>
                    option
                        .setName("campaign")
                        .setDescription("campaign")
                        .setRequired(true)

                        .addChoices(...campaigns)
                )
                .addAttachmentOption(option =>
                    option
                        .setName("character_sheet")
                        .setDescription("The Character Sheet")
                        .setRequired(true)
                ))
        .addSubcommand(subcommandGroup =>
            subcommandGroup
                .setName("load")
                .setDescription("loads the Character Sheets of an campaign")
                .addStringOption(option =>
                    option
                        .setName("campaign")
                        .setDescription("campaign")
                        .setRequired(true)

                        .addChoices(...campaigns)
                )),

    execute(interaction) {

        try {
            const campaign = interaction.options.getString("campaign");

            if(interaction.options.getSubcommand() === "save") {
                const file = interaction.options.getAttachment("character_sheet");


                https.get(file.url, (res) => {
                    let temp = file.name.split(".");
                    temp.pop();
                    let name = temp.join("_");

                    let str = name.split("_");
                    let control = str.pop();
                    if(!isNaN(parseInt(control))) name = str;

                    const path = campaignsPath + "/" + campaign + "/" + name + "_" + Date.now() + ".pdf";
                    const writeStream = fs.createWriteStream(path);

                    res.pipe(writeStream);

                    writeStream.on("finish", () => {
                        writeStream.close();
                    });
                });
                return interaction.reply({embeds: [{ title: "Success", description: `Uploaded file "**${file.name}**" to **${campaign}'s** campaign`}], ephemeral: true});
            }
            else if(interaction.options.getSubcommand() === "load"){

                let characterSheetFiles = fs.readdirSync(campaignsPath + "/" + campaign);

                let map = {};
                let attachments = [];

                for (const file of characterSheetFiles) {
                    let name = file.split(".")[0];
                    name = name.split("_");
                    let timestamp = name.pop();
                    name = name.join("_")

                    if(!map.hasOwnProperty(name)){
                        map[name] = [];
                    }

                    map[name].push(timestamp);
                }
                interaction.reply({ content: "This could take a while", ephemeral: true})


                let embeds = []
                let pdfs = []
                for (const mapKey in map) {

                        const timeStamp = Math.max(...map[mapKey]);
                        console.log(`${__storage}/campaigns/${campaign}/${mapKey}_${timeStamp}.pdf`)
                        const pdf = fs.readFileSync(`${__storage}/campaigns/${campaign}/${mapKey}_${timeStamp}.pdf`);
                        pdfs.push(pdf);
                        const attachment = new AttachmentBuilder(pdf)
                        //const attachment = new AttachmentBuilder(options =>
                            //options
                                //.setFile(convertImage(`${campaignsPath}/${campaign}/${mapKey}_${Math.max(...map[mapKey])}.pdf`, mapKey)))
                        attachments.push(attachment)

                        //embeds.push({ title: mapKey, image: { url: `attachment://${mapKey}_${Math.max(...map[mapKey])}.pdf` } })

                        const embed = new EmbedBuilder()
                            .setTitle(mapKey.replaceAll("_", " "))
                            .setImage(`attachment://${mapKey}_${timeStamp}.pdf`)
                            .setFooter({ text: "File was uploaded"})
                            .setTimestamp(timeStamp);
                        embeds.push(embed)
                        interaction.channel.send({embeds: [embed], files: [pdf]});

                    //console.log(`${campaignsPath}/${campaign}${mapKey}_${Math.max(...map[mapKey])}.pdf`)
                }

                //interaction.reply({ embeds, files: attachments })
                //console.log(pdfs)

                /*let mapKey = "Joshua_Charakter";
                //let temp = Math.max(...map[mapKey])
                let temp = "1668905895875";

                const file = new AttachmentBuilder(fs.readFileSync(`${__storage}/campaigns/${campaign}/${mapKey}_${temp}.pdf`));
                const embed = new EmbedBuilder()
                    .setTitle('Some title')
                    .setImage(`attachment://${mapKey}_${temp}.pdf`);
                return interaction.channel.send({ embeds: [embed], files: [file] });*/
                //return interaction.channel.send({content: "Test", embeds: embeds, files: pdfs});
            }
        }catch (e){
            console.log(e)
            return interaction.reply({embeds: [{ title: "Error", description: e}] });
        }
    }
};