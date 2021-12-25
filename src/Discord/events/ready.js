module.exports = () => {
    const client = global.client;
    let seq = 0;
    let wasLive = false;
    require('../util/TwitchWatcher').watch(async (live, viewers, title, game) => {
        // Do change
        if(live){
            if(seq == 0){
                seq = 1;
                client.user.setActivity({
                    type: "STREAMING",
                    name: title,
                    url: "https://twitch.tv/dubbyyt"
                });
            } else if(seq == 1) {
                seq = 2;
                client.user.setActivity({
                    type: "STREAMING",
                    name: `${viewers} viewers on Dubby's Twitch`,
                    url: "https://twitch.tv/dubbyyt"
                });
            } else {
                seq = 0;
                client.user.setActivity({
                    type: "STREAMING",
                    name: `${game} on Twitch`,
                    url: "https://twitch.tv/dubbyyt"
                });
            }
            
            if(wasLive == false){
                wasLive = true;
                const channel = await client.channels.fetch('923925977602592778');
                const messages = await channel.messages.fetch({ limit: 1 });
                if((Date.now() - messages.first().createdAt) > 1000 * 60 * 30){
                    channel.send(`@everyone Dubby is streaming ${game}
                    ${title} @ https://twitch.tv/${process.env.CHANNEL}`);
                }
            }
        } else {
            wasLive = false;
            client.user.setActivity({
                type: "PLAYING",
                name: "VALORANT"
            });
        }
    });
}