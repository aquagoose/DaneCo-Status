const gamedig = require('gamedig');
const Discord = require('discord.js');

module.exports = {
    name: 'status',
    description: 'Shows the status of the servers.',
    execute(msg) {
        var storemsg;
        var embed = new Discord.MessageEmbed()
        .setTitle("DaneCo Server Status")
        .setColor('#008CFF');
        async function getData() {
            await msg.channel.send("Please wait...").then(message => storemsg = message);
            await gamedig.query({
                type:'spaceengineers',
                host:'54.36.216.222',
                port:'27083'
            }).then(server => {
                if(server.players.length != 1) embed.addField(`Creative`, `Online\n${server.players.length} players of max ${server.maxplayers}.\nTook ${server.ping}ms to ping.`);
                else embed.addField(`Creative`, `Online\n${server.players.length} player of max ${server.maxplayers}\nTook ${server.ping}ms to ping.`);
            }).catch(error => {
                embed.addField(`Creative`, `Offline.`);
            });
            await storemsg.edit("Pinging...");
            await gamedig.query({
                type:'spaceengineers',
                host:'54.36.216.222',
                port:'27082'
            }).then(server => {
                if(server.players.length != 1) embed.addField(`Survival`, `Online\n${server.players.length} players of max ${server.maxplayers}.\nTook ${server.ping}ms to ping.`);
                else embed.addField(`Survival`, `Online\n${server.players.length} player of max ${server.maxplayers}\nTook ${server.ping}ms to ping.`);
            }).catch(error => {
                embed.addField(`Survival`, `Offline.`);
            });
            await storemsg.edit("Retrieving data...");
            await gamedig.query({
                type:'kspdmp',
                host:'51.89.150.122',
                port:'6702'
            }).then(server => {
                if(server.players.length != 1) embed.addField(`KSP`, `Online\n${server.players.length} players of max ${server.maxplayers}.\nTook ${server.ping}ms to ping.`);
                else embed.addField(`KSP`, `Online\n${server.players.length} player of max ${server.maxplayers}\nTook ${server.ping}ms to ping.`);
            }).catch(error => {
                embed.addField(`KSP`, `Offline.`);
            });
            await storemsg.delete();
            await msg.channel.send(embed);
        };
        getData();
    }
}