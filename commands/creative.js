const gamedig = require('gamedig');

module.exports = {
    name: 'creative',
    description: 'Shows the status of the creative server.',
    aliases:['c'],
    execute(msg) {
        gamedig.query({
            type:'spaceengineers',
            host:'54.36.216.222',
            port:'27083'
        }).then(server => {
            var playerlist = [];
            if (!server.players.length) playerlist.push("No players online.");
            else {
                for (const player of server.players) {
                    playertime = Math.floor((player.time)/60);
                    playerlist.push(`${player.name} - ${Math.floor((player.time)/60)} minutes`);
                }
            }
            if (server.maxplayers == 0) {
                var embed = {
                    title: "Crashed",
                    description: "That server appears to have crashed. Try again later.",
                    color: 0x262626
                };
            }
            else {
                var embed = {
                    title: server.name,
                    color: 0xFF0048,
                    fields: [
                        {
                            name:`Players`,
                            value:`${server.players.length}/${server.maxplayers}`,
                            inline:true
                        },
                        {
                            name:`IP`,
                            value:`steam://connect/${server.connect}`,
                            inline:true
                        },
                        {
                            name:`Player list`,
                            value:`${playerlist.join('\n')}`,
                            inline:false
                        }
                        ],
                        image: {
                            url: 'https://media.discordapp.net/attachments/635108220607922177/723945024668172359/Banner_Daneco.png'
                        },
                        timestamp: new Date(),
                        footer: {
                            text:`Ping time: ${server.ping}ms | DaneCo Servers - Since 2019`,
                        }
                    };
                }
            msg.channel.send({embed: embed});
        }).catch(err => {
            const embed = {
                title: "Offline",
                description: "That server appears to be offline. Try again later.",
                color: 0x262626
            };
            msg.channel.send({embed: embed});
        });
    }
}