/**
 * DubboBot
 * For DubbyYT's twitch
 * 
 * Made by MilesSRC on Github
 * 
 * © milesr.dev | 2021 - 2022
 */
require('dotenv').config();
const tmi = require('tmi.js');

// Launch client
const client = new tmi.Client({
    options: {debug: true, messagesLogLevel: "info" },

    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: process.env.USERNAME,
        password: `oauth:${process.env.ACCESS_TOKEN}`
    },

    channels: [`${process.env.CHANNEL}`]
});

// Connect to Twitch
client.connect().catch(console.error);

// Message Handler
client.on('message', (channel, tags, message, self) => {
    try {
        if(self) return;

        if(!message.startsWith("!")) return;

        const command = message.split("!")[1].split(" ")[0].toLowerCase();
        const args = message.split(" ").slice(1);

        switch(command){
            case "help":
                client.say(channel, `Ayo! What's up, its yo boy Dubbo.
                Here are my commands:
                | !help - Display this command
                | !hey - Say hi!
                | !lurk - Lurk in chat :3
                | !smacc @Person - Smacc someone
                | !hug @Person - Hug someone
                | !roll [# between 1 and 5] - Roll a dice`);
                break;
            case "lurk":
                client.say(channel, `@${tags.username} is now lurking. Dubbo notices and approves!`);
                break;
            case "hey":
                client.say(channel, `@${tags.username}, ayo wassup! :)`);
                break;
            case "smacc":
                if(args[0]){
                    if(args[0].startsWith("@")){
                        const responses = ["How rude!", "lmao get rekt", "1-tapped ez", "They're out for the count!", "And they're outta here!", "What a hit!", "Heard from miles away", "Dubby approves", "<none>", "ggez", "gg", "wp"];
                        client.say(channel, `@${tags.username} slapped ${args[0]} - ${responses[trueRandom(0, responses.length)]}`);
                    } else {
                        client.say(channel, `@${tags.username} slapped themselves!`);
                    }
                } else {
                    client.say(channel, `@${tags.username} slapped themselves!`);
                }
                break;
            case "hug":
                if(args[0]){
                    if(args[0].startsWith("@")){
                        const responses = ["Soo cute!", "adorable", "nep", "nep nep", "*flushed*", "*Neps Internally*", "Amazin'"];
                        client.say(channel, `@${tags.username} hugged ${args[0]} - ${responses[trueRandom(0, responses.length)]}`);
                    } else {
                        client.say(channel, `@${tags.username} hugged themselves! - Yikesss`);
                    }
                } else {
                    client.say(channel, `@${tags.username} hugged themselves! - Yikesss`);
                }
                break;
            case "roll":
                const rolled = args[0] || trueRandom(1, 5);
                const diced = trueRandom(1, 5);

                try {
                    if(new Number(args[0]) > 5 || new Number(args[0]) < 0)
                        rolled = trueRandom(1, 5);
                } catch {
                    rolled = trueRandom(1, 5);
                }

                client.say(channel, `@${tags.username} rolled a ${rolled} - The number was ${diced}`);
                break;
            default:
                client.say(channel, `That command doesn't exist. :(`);
        }
    } catch (err) {
        console.log("Prevented crash.");
        console.error(err);
    }
});

function trueRandom(max, min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}