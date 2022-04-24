const { Client, Intents, Collection } = require("discord.js");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const guilds = require("./models/guild");
const levelsModel = require("./models/levels");
//require('discord-buttons')(client);
const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES,
    ]
});

client.on('ready', () =>{
  console.log(`Ready!`)
   client.user.setPresence({ status: 'dnd', activities: [{ name: 'Gweep Creative', type: 'WATCHING' }] })
})

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connect MongoDb"))
.catch(console.error);

global.commands = new Collection();
fs.readdir("./commands", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        global.commands.set(props.name, props);
    });
});

client.on('messageCreate', async message => {
    if (message.author.bot && !message.guild) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const command = message.content.split(" ")[0].slice(process.env.PREFIX.length);
    const args = message.content.split(" ").slice(1);
    const cmd = global.commands.get(command);
    if(cmd) cmd.run(client, message, args);
});

require("./events.js")(client);
client.login(process.env.TOKEN);