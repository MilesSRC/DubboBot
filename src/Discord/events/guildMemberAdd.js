const discord = require('discord.js');

module.exports = (member) => {
    const client = global.client;
    member.roles.add('923904624967188480');
    
    const embed = new discord.MessageEmbed()
    .setTitle(":wave: Heya! Welcome to Dubby's Puddings (DubbyYT's Stream Discord)")
    .setDescription(`Please give ${member} a warm welcome to the discord!`)
    .setColor("#f535aa");
    
    client.channels.fetch('923904217243066371').then(channel => channel.send({ embeds: [embed] }));
}