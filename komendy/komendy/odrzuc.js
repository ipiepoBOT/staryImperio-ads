const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "odrzuc",
    aliases: ["dec"],
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("858336340528857089")) return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!db.get(`reklama_do_${args[0]}`)) {
            return msg.reply("Nie ma takiej reklamy w bazie danych!")
        }

        if (!args[1]) {
            return msg.reply("Podaj powód!")
        }

        const osoba = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/attachments/809356941255901200/810218439607844864/bad.gif")
        .setDescription("**Reklama serwera `" + db.get(`reklama_do_${args[0]}_name`) + "` została odrzucona z powodu: __\n`" + args.slice(1).join(" ") + "`__**")
        .setFooter(`Weryfikator: ${msg.author.tag} || ${msg.author.id}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.users.cache.get(db.get(`reklama_do_${args[0]}_osoba`)).send(osoba)

        const kanal_reklam = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/attachments/809356941255901200/810218439607844864/bad.gif")
        .setDescription("**Reklama tego serwera została odrzucona z powodu: __\n`" + args.slice(1).join(" ") + "`__**")
        .setFooter(`Weryfikator: ${msg.author.tag}` || `msg.author.displayAvatarURL`())
        .setColor("RED")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)

        const statusy = new MessageEmbed()
        .setAuthor("Reklama odrzucona!", "https://cdn.discordapp.com/attachments/809356941255901200/810218439607844864/bad.gif")
        .setDescription("**Reklama serwera `" + db.get(`reklama_do_${args[0]}_name`) + "` została odrzucona z powodu: __\n`" + args.slice(1).join(" ") + "`__**")
        .setFooter(`Weryfikator: ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.channels.cache.get("788879822343766036").send(statusy)
        db.delete(`reklama_do_${args[0]}_osoba`)
        db.delete(`reklama_do_${args[0]}`)
        db.delete(`reklama_do_${args[0]}_name`)
        msg.reply("Odrzucono!")
    }

}