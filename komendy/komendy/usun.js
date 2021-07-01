const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")


module.exports = {
    name: "usun",
    aliases: ["usuń"],
    run: async (client, msg, args) => {
        if(!msg.member.roles.cache.has("858336340528857089")) return;

        if (!args[0]) {
            return msg.reply("Podaj numer reklamy!")
        }

        if (!args[1]) {
            return msg.reply("Podaj powód!")
        }

        if (!db.get(`reklama_${args[0]}`)) {
            return msg.reply("W bazie danych nie ma takiej reklamy!")
        }

        db.delete(`reklama_${args[0]}`)
        db.delete(`reklama_${args[0]}_id`)
        const statusy = new MessageEmbed()
        .setAuthor("Reklama usunięta!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
        .setDescription("Reklama o numerze `" + args[0] + "` została usunięta z powodu:\n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Przez: ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.channels.cache.get("788879822343766036").send(statusy)
        msg.reply("Usunięto reklame o numerze `" + args[0] + "`!")
    }
}