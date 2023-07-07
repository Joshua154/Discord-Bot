
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>Discord-Bot
</h1>
<h3>◦ Node JS Discord Bot</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style&logo=Sequelize&logoColor=white" alt="Sequelize" />
<img src="https://img.shields.io/badge/MySQL-4479A1.svg?style&logo=MySQL&logoColor=white" alt="MySQL" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/languages/top/Joshua154/Discord-Bot.git?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/Joshua154/Discord-Bot.git?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/Joshua154/Discord-Bot.git?style&color=5D6D7E" alt="GitHub commit activity" />
</div>

---

## 📒 Table of Contents
- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📂 Project Structure](#project-structure)
- [🚀 Getting Started](#-getting-started)
---


## 📍 Overview

The project is a Node JS Discord bot that was created to learn how to use the Discord.js library and JS it self.

---

## 📂 Project Structure

<details closed><summary>Files</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|--------------------------------------------------------------------------------------------------------------------| ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [index.js](https://github.com/Joshua154/Discord-Bot/blob/master/index.js)                                          | The provided code snippet is a Discord bot that utilizes the Discord.js library and interacts with various plugins like DisTube, SpotifyPlugin, SoundCloudPlugin, and YtDlpPlugin. It also connects to a MySQL database for storing and retrieving data. The bot registers commands, select menus, and buttons from specific directories. It handles various types of interactions such as command execution, select menu selection, and button clicks. The bot also includes a function for determining if a number is a critical hit.                      |
| [start.bat](https://github.com/Joshua154/Discord-Bot/blob/master/start.bat)                                        | The code triggers the execution of the "index.js" file by running the "start.bat" batch file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [role-button.js](https://github.com/Joshua154/Discord-Bot/blob/master/buttons/buttonRoles/role-button.js)          | This code snippet exports a module that provides functionalities for creating role buttons in a Discord.js application. It includes methods for creating buttons with or without emojis, and an onClick function that handles adding or removing roles based on user interaction.                                                                                                                                                                                                                                                                            |
| [bodypart.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/bodypart.js)                       | This code snippet is a Discord.js slash command that rolls a dice to determine a body part. It takes optional parameters for the number of times to roll the dice and the user to roll for. It also has an option to roll the dice privately. The execution of the command sends an embed with the result.                                                                                                                                                                                                                                                   |
| [characterSheet.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/characterSheet.js)           | This code snippet defines a Discord slash command called "character_sheet" with two subcommands: "save" and "load". The "save" subcommand allows users to save a character sheet by providing a campaign name and an attached file. The file is downloaded from the provided URL and saved in a specified directory. The "load" subcommand retrieves and displays the character sheets of a specified campaign by reading the PDF files from the campaign's directory and sending them as attachments in a Discord embed message.                            |
| [countOfRolles.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/countOfRolles.js)             | This code snippet is an implementation of a Discord slash command. It retrieves the number of a specific roll from a MySQL database based on user input. The code uses the discord.js library for interacting with the Discord API and the mysql library for connecting to the database. It handles optional user and number options, performs the database query, calculates the count of each roll, and generates a response embed with the results.                                                                                                       |
| [currency.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/currency.js)                       | This code snippet defines a Discord slash command called "currency" that converts a given amount of currency into gold, silver, and pence. It takes the currency amount as input and splits it into gold, silver, and pence values. It then calculates the total pence, converts it into the respective gold, silver, and pence values, and displays them in an embed message. There is a commented-out section for performing calculations between two different currency inputs. The code also includes a helper function for basic arithmetic operations. |
| [currentPlayer.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/currentPlayer.js)             | This code snippet defines a Discord slash command called "current_player" that selects a channel as an optional parameter. It retrieves the selected channel or defaults to the member's channel. It then loops through the members of the channel and logs each member.                                                                                                                                                                                                                                                                                     |
| [getAllRolles.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/getAllRolles.js)               | This code snippet is a Discord bot command that retrieves and displays the average rolls of a user from a MySQL database. It connects to the database using the provided credentials, retrieves the rolls and corresponding timestamps for the specified user, and generates an embed message displaying the rolls. The code handles error scenarios and closes the database connection after execution.                                                                                                                                                     |
| [getAVGRoll.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/getAVGRoll.js)                   | This code snippet is a Discord bot command that calculates the average dice roll for a specific user or the interacting user. It connects to a MySQL database using the provided credentials. It retrieves the rolls from the database, calculates the average, and sends a reply with the result.                                                                                                                                                                                                                                                           |
| [magischeMiesmuschel.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/magischeMiesmuschel.js) | This code snippet defines a Discord slash command "magische_miesmuschel". When executed, it generates a random response ("It is certain", "Reply hazy, try again", etc.) from a table of sentences in English or German. The response is displayed in an embed with a thumbnail image.                                                                                                                                                                                                                                                                       |
| [peter.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/peter.js)                             | The provided code snippet exports a Discord slash command with the name "peter" and the description "1". When the command is executed, it retrieves the user who triggered the command, creates an embedded message with the user's name and a custom message, and replies to the interaction with the embedded message.                                                                                                                                                                                                                                     |
| [roll.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/roll.js)                               | This code snippet is a Discord bot command that allows users to roll dice. It uses the Discord.js library for interacting with the Discord API and the dice-notation-js library for parsing and rolling dice. The command takes a string input representing the dice to roll, supports rolling multiple dice at once using the "x" delimiter, and provides detailed information about each roll, including the result, individual rolls, and modifier.                                                                                                       |
| [substitute.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/substitute.js)                   | This code snippet defines a Discord slash command for managing substitutes. It allows users to add or remove substitute people. The command parameters include the substitute and replacing person. The code handles the command execution, updates the substitutes data, and writes it to a JSON file. It also sends appropriate response messages based on the executed subcommand.                                                                                                                                                                        |
| [testPassed.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/dnd/testPassed.js)                   | This code snippet is a Discord bot command that rolls dice. It takes optional parameters such as the number of times to roll, the user to roll for, and whether to roll privately. It generates random numbers, handles user substitutions, and sends embedded messages with the roll results.                                                                                                                                                                                                                                                               |
| [loop.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/loop.js)                             | The provided code snippet is a module.exports function that represents a slash command for a Discord bot. When executed, it checks if there is an active music queue. If there is, it sends an embed message with buttons for controlling the music loop mode. The buttons allow the user to set the loop mode to queue, now playing, or turn off looping. The function also handles button interactions and updates the messages accordingly. If an error occurs, it logs the error and sends an error message to the user.                                 |
| [lyrics.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/lyrics.js)                         | This code snippet contains a Discord bot command to display lyrics for a specific song or the current song being played. It uses the discord.js library for interacting with Discord, the axios library for making HTTP requests, and @discordjs/builders for building slash commands. The code fetches lyrics from an API, formats the response into embeds, and sends them as a reply to the user. If no lyrics are found, it sends a message indicating that no lyrics could be found.                                                                    |
| [nowplaying.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/nowplaying.js)                 | This code snippet defines a slash command called "nowplaying" that provides information about the currently playing music. It retrieves the music queue from the client, checks if there is a playing song, and creates an embed with details like volume, duration, URL, loop mode, and filters. It then sends the embed as a reply to the interaction. Any errors during execution are logged or replied to the user.                                                                                                                                      |
| [play.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/play.js)                             | This code snippet exports a slash command named "play" for a Discord bot. The command has a subcommand "normal" that allows users to play music from other platforms. The user provides the name of the music as a required string option. The code handles executing the command by playing the music in the user's voice channel and provides error handling. It also logs any errors encountered during the execution of the command.                                                                                                                     |
| [skip.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/skip.js)                             | The code snippet defines a slash command named "skip" for a Discord bot. It allows users to skip songs in a music queue. Users can specify the number of songs to skip, or skip the current song by default. The code also handles error logging and sends appropriate responses to the user.                                                                                                                                                                                                                                                                |
| [stop.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/stop.js)                             | This code snippet defines a "stop" slash command for a Discord bot. When executed, it stops the currently playing music in a guild. If an error occurs, it logs the details and sends an error message to the user.                                                                                                                                                                                                                                                                                                                                          |
| [volume.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/music/volume.js)                         | This code snippet exports a Discord slash command for adjusting the music volume. It checks if the music is currently being played and validates the provided volume. It then sets the volume and sends a success message. If an error occurs, it logs the details and sends an error message. The code uses the discord.js library for interacting with the Discord API.                                                                                                                                                                                    |
| [back.js](https://github.com/Joshua154/Discord-Bot/blob/master/commands/temp/abc/back.js)                          | This code snippet is an implementation of a "back" command for a music bot. It plays the previous track in the queue. It retrieves the language settings, checks if there is an active queue, and returns an appropriate response. It also handles errors and logs them if needed.                                                                                                                                                                                                                                                                           |
| [interactionCreate.js](https://github.com/Joshua154/Discord-Bot/blob/master/events/interactionCreate.js)           | This code snippet listens for interactions in a Discord server. It handles commands, context menus, buttons, and select menus. It executes the appropriate function based on the interaction type. It also includes a function to process user votes in a poll.                                                                                                                                                                                                                                                                                              |
| [en.js](https://github.com/Joshua154/Discord-Bot/blob/master/languages/en.js)                                      | The code snippet defines a language object that contains various messages used in a bot application. These messages cover different scenarios such as loading events and commands, displaying errors, success messages, information about music, playlists, volumes, and command usage.                                                                                                                                                                                                                                                                      |
| [role-message-schema.js](https://github.com/Joshua154/Discord-Bot/blob/master/models/role-message-schema.js)       | This code snippet defines a Mongoose schema for managing button roles in a Guild. It requires three string properties: _id (Guild ID), channelId, and messageId. It exports a Mongoose model using the name'button-roles', creating a new model or using an existing one if available.                                                                                                                                                                                                                                                                       |
| [googleQR.js](https://github.com/Joshua154/Discord-Bot/blob/master/util/googleQR.js)                               | The code snippet exports a function called `generateQR` that generates a QR code image using a Google API. It takes in parameters like data (URL), height, width, and color. If no data is provided, an error is thrown. The function returns a string with the Google API URL and additional query parameters for the specified height, width, color, and background color.                                                                                                                                                                                 |
| [Multiset.js](https://github.com/Joshua154/Discord-Bot/blob/master/util/Multiset.js)                               | The code snippet is a class called Multiset that extends the Map class. It allows adding and removing elements from the Multiset, while keeping track of the count of each element. The Multiset can also be sorted.                                                                                                                                                                                                                                                                                                                                         |

</details>

---

## 🚀 Getting Started

### 📦 Installation

1. Clone the Discord-Bot repository:
```sh
git clone https://github.com/Joshua154/Discord-Bot.git
```

2. Change to the project directory:
```sh
cd Discord-Bot
```

3. Install the dependencies:
```sh
npm install
```

### 🎮 Using Discord-Bot

```sh
node index.js
```
---
generated by [readme-ai](https://github.com/eli64s/readme-ai)