const fs = require('node:fs');
const { Client, Collection } = require('discord.js');
const { token } = require('./config.json');
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const mysql = require("mysql");
const {host, user, password, database, table_name} = require("./config.json");
const Dice = require("./util/Dice.js");

module.exports = client = new Client({ partials:["Channel", "GuildMember", "User"], intents: ['Guilds', 'GuildMessages', "MessageContent", "GuildVoiceStates"] });

client.player = new DisTube(client, {
	leaveOnStop: false,
	leaveOnFinish: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin(),
	],
});

client.test = "test187";

client.writeToDatabse = (rolluser, result, count) => {
	try{
		var con = mysql.createConnection({ host, user, password, database });
		con.connect(function(err) {
		});

		sql = `INSERT INTO ${table_name} (userID, roll, time) VALUES ('${rolluser.id}', '${result}', '${Math.floor((Date.now() / 1000) + count)}')`;
		con.query(sql, function (err, result) {
			if (err) {
				if (err.code === 'ER_DUP_ENTRY') { void(0); }
			}
			con.end()
		});
	}catch (e) {
		console.log(e)
	}
}

client.getFromDatabse = (sql) => {
	try{
		con.query(sql, function (err, result) {
			if (err) {
				if (err.code === 'ER_DUP_ENTRY') { void(0); }
				else { throw err;}
			}else {
				return result;
			}
			con.end()
		});
	}catch (e) {
		console.log(e)
	}
}


client.commands = new Collection();

var dicFiles = fs.readdirSync('./commands')
for (const dic of dicFiles) {
	if (dic.substr(-4) === '.txt') continue;
	const commandFiles = fs.readdirSync(`./commands/${dic}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${dic}/${file}`);
		client.commands.set(command.data.name, command);
	}
}


client.selectMenu = new Collection();

dicFiles = fs.readdirSync('./selectMenus')
for (const dic of dicFiles) {
	if (dic.substr(-4) === '.txt' || dic.substr(1) === '#') continue;
	const selectMenuFiles = fs.readdirSync(`./selectMenus/${dic}`).filter(file => file.endsWith('.js'));

	for (const file of selectMenuFiles) {
		const selectMenu = require(`./selectMenus/${dic}/${file}`);
		client.selectMenu.set(selectMenu.data.name, selectMenu);
	}
}


client.buttons = new Collection();

dicFiles = fs.readdirSync('./buttons')
for (const dic of dicFiles) {
	if (dic.substr(-4) === '.txt' || dic.substr(1) === '#') continue;
	const buttonFiles = fs.readdirSync(`./buttons/${dic}`).filter(file => file.endsWith('.js'));

	for (const file of buttonFiles) {
		const button = require(`./buttons/${dic}/${file}`);
		client.buttons.set(button.name, button);
	}
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()){
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}


	else if (interaction.isSelectMenu()){
		await interaction.deferReply({ ephemeral: false });
		const contextMenu = client.selectMenu.get(interaction.commandName);
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
		else if (interaction.customId.match(/(diceButton_)/i)){
            let arg = interaction.customId.split("_")[1]
            if(arg === "dice"){
				const dice = Dice.getEmbed(false, 1, interaction.user);
                interaction.reply({embeds: dice.embeds, ephemeral: dice.ephemeral, components: [Dice.getRow("Dice")]})
				await interaction.message.edit({
					components: []
				})
            }
        }
		else {
			const button = client.buttons.get(interaction.customId.split("_")[0].replace("_", ""));
			if (!button) return;

			try {
				await button.onClick(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	}
});

client.login(token);



/*async function prosesOption(interaction){
	const db = await client.db.get(`polls.p${interaction.message.id}`)
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
}*/