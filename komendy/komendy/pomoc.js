const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "pomoc",
    aliases: ["help"],
    run: async (client, msg) => {
        const embed = new Discord.MessageEmbed()
    .setAuthor("Menu pomocy!", "https://cdn.discordapp.com/attachments/809356941255901200/810767710211407892/bluntyogloszenie.gif")
    .addField("> Konfiguracyjne:", "***%kanał \n%reklama <treść>***",)
    .addField("> Informacyjne:", "***%statystyki \n%linki***", )
    .setFooter(`Wykonano dla: ${msg.author.tag}`)
    .setColor("#00f2fe")
    msg.channel.send(embed)
    }
}
