const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")


module.exports = {
    name: "kanal",
    aliases: ["kanał"],
    run: async (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const permisja = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Brak permisji do zarządzania serwerem!`")
            .setColor("RED")
        return msg.channel.send(permisja)
        }
    
        const men_kan = 
        msg.guild.channels.cache.get(args[0]) ||
        msg.guild.channels.cache.find(x => x.name === args.join(" ")) ||
        msg.mentions.channels.first();
    
        if (!men_kan) {
            const blad_kanal = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Oznacz kanał do reklam!`")
            .setColor("RED")
        return msg.channel.send(blad_kanal)
        }
    
        if (!msg.guild.channels.cache.get(men_kan.id)) {
            const blad_kanal2 = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Oznacz Kanał do Reklam!`")
            .setColor("RED")
        return msg.channel.send(blad_kanal2)
        }
    
        if (men_kan.type !== "text") {
            const no_oznacz_ten_kanal_deklu = new Discord.MessageEmbed()
            .setAuthor("Error!", "https://cdn.discordapp.com/attachments/809356941255901200/810218507102191646/uwaga.gif")
            .setDescription("`Oznacz kanał do reklam!`")
            .setColor("RED")
            return msg.channel.send(no_oznacz_ten_kanal_deklu)
        }
    
        db.set(`kanal_reklama_${msg.guild.id}`, men_kan.id)
    
        const embed = new Discord.MessageEmbed()
        .setAuthor("Ustawiono!", "https://cdn.discordapp.com/attachments/809356941255901200/810218638866776114/sukces.gif")
        .setDescription("`Pomyślnie ustawiono kanał do reklam!, ustaw teraz reklamę komendą %reklama <reklama>`")
        .setColor('GREEN')
        await msg.channel.send(embed), men_kan.setTopic("Kanał zarezerowany dla reklam od bota <@856554527515082772>")
    
    
    }
}