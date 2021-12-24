const { default: axios } = require("axios");

exports.watch = (changecb) => {
    let lastOnline = false;
    let lastViewerCount = 0;

    // Broadcast Stream Details to app
    setInterval(() => {
        axios.get(`https://api.twitch.tv/helix/streams?user_login=DubbyYT`, 
        { 
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(response => {
            const returned = response.data.data[0];
            if(returned == undefined){ // Offline
                if(lastOnline == true){
                    lastOnline = true;
                    changecb(false, lastViewerCount);
                }
            } else {
                if(lastOnline == false){
                    lastOnline = true;
                    changecb(true, lastViewerCount, returned.title);
                } else {
                    if(lastViewerCount != returned.viewer_count){
                        lastViewerCount = returned.viewer_count;
                        changecb(true, lastViewerCount, returned.title);
                    }
                }
            }
        }).catch((err) => {
            console.error("<Twitch Watcher>: Failed to grab stream details.");
            console.error(err);
        })
    }, 15000);
}