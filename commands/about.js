const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'about',
    description: 'Information about the DaneCo Status bot.',
    category: 'misc',
    execute (msg) {
        var botmember = '698579048380629044';
        var embed = new Discord.MessageEmbed()
        .setTitle('About DaneCo Status bot')
        .setColor('#FF0048')
        .setDescription('DaneCo Status for DaneCo Servers - Since 2019\nDeveloped by Ollie Robinson aka petre grifon.\nhttps://rollbot.net/daneco (WIP)');
        msg.channel.send(embed);
    }
}