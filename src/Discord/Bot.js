exports.start = () => {
    const discord = require('discord.js');
    const client = new discord.Client({
        intents: ["GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILDS", "GUILD_MEMBERS"]
    });

    client.on('ready', require('./events/ready'));
    client.on('guildMemberAdd', require('./events/guildMemberAdd'));
    client.on('messageCreate', require('./events/message'));

    client.login(process.env.BOT_TOKEN);
    global.client = client;
}