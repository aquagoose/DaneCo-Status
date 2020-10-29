const Discord = require('discord.js');
const { prefix } = require('../botconf.json');

module.exports = {
    name:'help',
    description:'Shows this command',
    aliases: ['h'],
    execute(msg){
        const { commands } = msg.client;
        const cmds = commands.map(command => command);
        var embed = new Discord.MessageEmbed()
        .setTitle("DaneCo Status - Help")
        .setColor('#FF0048');
        for (var i=0; i<cmds.length; i++) {
            const commandname = cmds[i].name;
            var commanddesc = cmds[i].description;
            if (cmds[i].aliases) commanddesc += `\nYou can also use: \`${cmds[i].aliases.join(', ')}\` to access this command.`
            if (commandname != 'help') embed.addField(`\`${prefix}${commandname}\``, `${commanddesc}`);
        }
        msg.channel.send(embed)
    }
}