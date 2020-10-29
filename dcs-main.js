const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./botconf.json');
const fs = require('fs');
const gamedig = require('gamedig');
client.commands = new Discord.Collection();
var rollingnumber = 0;

const getCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of getCommands) {
    const command = require(`./commands/${file}`);
    console.log(`Loading ${file}`)
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Bot is ready!");
    rollingPresence();
    setInterval(rollingPresence, 15000);
});

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    args = message.content.slice(prefix.length).split(' ');
    commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.reply(`I don't recognize that command. Type \`d/help\` to get a list of my commands.`);
    if (command.disabled) return message.reply(`that command has been disabled.`);

    if (command.args && !args.length) {
        return message.reply(`that command requires some arguments.\nHere's how you use the command: \`${command.name} ${command.usage}`);
    }
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply(`that command encountered an error.... whoops.`);
    }
});

function rollingPresence() {
    rollingnumber++;
    switch(rollingnumber) {
        case 1:
            gamedig.query({type: 'spaceengineers',host: '54.36.216.222',port: '27083'}).then((server) => {
                if (server.players.length == 1) client.user.setActivity(`Creative - ${server.players.length} player`, { type: 'WATCHING' });
                else client.user.setActivity(`Creative - ${server.players.length} players`, { type: 'WATCHING' });
            }).catch(err => client.user.setActivity(`Creative - Offline`, { type: 'WATCHING' }));
            break;
        case 2:
            gamedig.query({type: 'spaceengineers',host: '54.36.216.222',port: '27082'}).then((server) => {
                if (server.players.length == 1) client.user.setActivity(`Survival - ${server.players.length} player`, { type: 'WATCHING' });
                else client.user.setActivity(`Survival - ${server.players.length} players`, { type: 'WATCHING' });}).catch(err => client.user.setActivity(`Survival - Offline`, { type: 'WATCHING' }));
            break;
        case 3:
            client.user.setActivity(`${prefix}status | ${prefix}help`, { type: 'PLAYING' });
            break;
        default:
            rollingnumber = 0;
            rollingPresence();
            break;
    }
}

client.login(token);