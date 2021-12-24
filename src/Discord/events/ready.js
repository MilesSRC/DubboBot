module.exports = () => {
    const client = global.client;
    let seq = 0;
    let wasLive = false;
    require('../util/TwitchWatcher').watch(async (live, viewers, title) => {
        // Do change
        if(live){
            if(seq == 0){
                seq = 1;
                client.user.setActivity({
                    type: "STREAMING",
                    name: title,
                    url: "https://twitch.tv/dubbyyt"
                });
            } else {
                seq = 0;
                client.user.setActivity({
                    type: "STREAMING",
                    name: `${viewers} viewers on Dubby's Twitch`,
                    url: "https://twitch.tv/dubbyyt"
                });
            }
            
            if(wasLive == false){
                wasLive = true;
                const channel = await client.channels.fetch('923925977602592778');
                const messages = await channel.messages.fetch({ limit: 1 });
                if((Date.now() - messages.first().createdAt) > 1000 * 60 * 30){
                    channel.send(`@everyone Dubby is live! https://twitch.tv/${process.env.CHANNEL}`);
                }
            }
        } else {
            client.user.setActivity({
                type: "PLAYING",
                name: "VALORANT"
            });
        }
    });
}