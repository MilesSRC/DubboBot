const { MessageEmbed } = require("discord.js");

module.exports = (message) => {
    const client = global.client;
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) return;

    const command = message.content.split("!")[1].split(" ")[0];
    const args = message.content.split(" ").slice(1);

    switch(command){
        case "rules":
            if(message.author.id == "119602225696735232"){
                const embed = new MessageEmbed()
                .setTitle("⤛ Please follow all of these rules at all times in the discord & stream ⤜")
                .setDescription(`
                **[1]** Please follow Discord's Terms of Service at https://discord.com/terms
                **[2]** No NSFW content is allowed anywhere in the discord.
                **[3]** Swearing is allowed, but keep it to a minimum please!
                **[4]** Keep everything in their respective channels. Keeps things organized.
                **[5]** No self-promo is allowed unless allowed by Dubby.
                **[6]** Keep drama to a minimum. Dubby will not hesistate to mute ppl/chats.
                **[7]** Do not try and break things, unless allowed by Dubby.
                **[8]** Have fun, we're all here to have fun and create good memories.`)
                .setFooter("Rules last updated")
                .setTimestamp()
                .setColor("#f535aa");

                message.channel.send({ embeds: [embed] });
                message.delete();
            }
    }
}