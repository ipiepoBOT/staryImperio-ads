const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    aliases: ["invite", "zapros", "zaproś", "Engir.ADV", "bot", "linki"],
    run: async (client, msg) => {
        const linki = new Discord.MessageEmbed()

    .setTitle("🔗Linki do bota Imperio-ads!")
    .setColor('#00f2fe')
    .addField('Support', '**[Support](https://discord.gg/PUvpXDhdBS)**')
    .addField("Dodaj Imperio-ads", '**[Dodaj Mnie](https://discord.com/api/oauth2/authorize?client_id=856554527515082772&permissions=64592&scope=bot)**')
    .setFooter(`Wykonano dla: ${msg.author.tag}`)
    msg.channel.send(linki)
    }
    
}
