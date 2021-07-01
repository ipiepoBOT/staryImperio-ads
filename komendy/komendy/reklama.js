const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "reklama",
    run: async (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const brak_uprawnien = new MessageEmbed()
            .setAuthor("Error", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setColor("RED") 
            .setDescription("`Nie posiadasz Uprawnień do Zarządzania Serwera!`")
        return msg.channel.send(brak_uprawnien)
        }

        if (db.get(`reklama_do_${msg.guild.id}`)) {
            const czeka = new MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810767956811186176/bluntyladowanie.gif")
            .setDescription("`Reklama oczekuje na weryfikacje!`")
            .setColor("RED")
            return msg.channel.send(czeka)
        }

        if (!db.get(`kanal_reklama_${msg.guild.id}`)) {
            const brak_kanału = new MessageEmbed()
            .setAuthor("Error", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Musisz ustawić kanał do reklam!`")
            .setColor("RED")
        return msg.channel.send(brak_kanału)
        }

        if (!args[0]) {
            const brak_reklamy = new MessageEmbed()
            .setAuthor("Error", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Podaj swoją reklamę`")
            .setColor("RED")
        return msg.channel.send(brak_reklamy)
        }

        if (args.join(" ").includes("@here")) {
            const nie_dawać_here_do_reklamy = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription(`Reklama nie może zawierać pingu!`)
            .setColor("RED")
            return msg.channel.send(nie_dawać_here_do_reklamy)
           }
        
           if (args.join(" ").includes("@everyone")) {
            const nie_dawać_evryone_do_reklamy = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription(`Reklama nie może zawierać pingu!`)
            .setColor("RED")
            return msg.channel.send(nie_dawać_evryone_do_reklamy)
           }
            
           if (args.join(" ").includes("discord.gg/" || "https://discord.gg/" || "discordapp.com/invite/" || "https://discordapp.com/invite/")) {
            const nie_dodawaj_linku = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription(`Reklama nie może zawierać linku do serwera, bot sam je doda!`)
            .setColor("RED")
           return msg.channel.send(nie_dodawaj_linku)
           }
           msg.channel.createInvite({
            maxAge: 0
            }).then(invite => { 
                db.set(`reklama_do_${msg.guild.id}`, args.join(" ") + `\nhttps://discord.gg/${invite.code}`)
                db.set(`reklama_do_${msg.guild.id}_name`, msg.guild.name)
                db.set(`reklama_do_${msg.guild.id}_osoba`, msg.author.id)
                db.set(`reklama_${msg.guild.id}_serwera`, args.join(" ") + `\nhttps://discord.gg/${invite.code}`)
            
            const reply = new MessageEmbed()
            .setAuthor("Pomyślnie Ustawiono!", "https://cdn.discordapp.com/attachments/809356941255901200/810218638866776114/sukces.gif")
            .setDescription(`**Reklama serwera została wysłana do weryfikacji, oczekuj na wiadomość zwrotną!**`)
            .setColor('GREEN')
            msg.channel.send(reply)

            const spr_reklam = new MessageEmbed()
            .setAuthor("Nowa reklama do sprawdzenia!", "https://cdn.discordapp.com/attachments/809356941255901200/810767989342994442/bluntywykrzyknik.gif")
            .setDescription("Serwer: `" + msg.guild.name + " || " + msg.guild.id + "`\nOsoba: `" + msg.author.username + " || " + msg.author.id + "`")
            .addField("Treść:", "`" + db.get(`reklama_do_${msg.guild.id}`) + "`")
            .addField("Zaproszenie kliknij", `[**Zaproszenie**](https://discord.gg/${invite.code})`)
            .setColor('#00f2fe')
            .setFooter("Komendą %acc <id> <numer> dodajesz reklamę || Komendą %dec <id> <powod> odrzucasz || Komendą %usun <id> <powód> usuwasz reklame")
            client.channels.cache.get("858417822521753600").send(spr_reklam)
            

        })
    }
}
