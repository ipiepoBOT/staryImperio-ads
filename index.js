const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const db = require("quick.db")
const fs = require("fs");
const { MessageEmbed } = require("discord.js")
const token = "";

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



client.categories = fs.readdirSync("./komendy/");
client.on("guildDelete", guild => {
    client.channels.cache.get("809778667538087946").send("**Wyrzucono bota z serwera!**\n Serwer: `" + guild.name + " || " + guild.id + "`\n Osoby: `" + guild.members.cache.size + "`")
    db.delete(`reklama_do_${guild.id}`)
    db.delete(`reklama_do_${guild.id}_osoba`)
    db.delete(`reklama_do_${guild.id}_name`)
    db.delete(`reklama_${guild.id}_serwera`)
    db.delete(`kanal_reklama_${guild.id}`)
})

client.on("ready", async msg => {
    client.user.setPresence({ activity: { name: `%pomoc | @Imperio-ads 🔍` }, status: 'online' })
    console.log(`${client.user.tag}`);
    console.log(db.get(`numer`))
    setInterval(() => {
        let numer = db.get(`numer`)
    if (!db.get(`reklama_${numer}`)) {
        return db.set(`numer`, 1), console.log("Koniec kolejki!")
    }
    let id_rek = db.get(`reklama_${numer}_id`)

    client.guilds.cache.forEach(servers_each => {
    if (db.get(`premium_${id_rek}`)) {
        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
	if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return; 
        if (!client.guilds.cache.get(servers_each.id)) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Reklama __PREMIUM NUMER:__${numer} || ${id_rek}`, "https://cdn.discordapp.com/attachments/809356941255901200/810239355121041458/konfetti.gif")
        .setColor("RANDOM")
        .setDescription(db.get(`reklama_${numer}`))
        client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`)).send(embed)
        
    } else {
        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
         if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return; 
        if (!client.guilds.cache.get(servers_each.id)) return;
        client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`)).send(`**🔢Numer:** **(** **${numer}** **)** **Id** **(** **${db.get(`reklama_${numer}_id`)}** **)** \n\n${db.get(`reklama_${numer}`)}`)
    }
})
db.add(`numer`, 1)
}, 300000)
});

client.on("guildCreate", guild => {
    console.log(`Dodano na Serwer ${guild.name}`)
  })

  client.on("message", async message => {
    const { MessageEmbed } = require("discord.js")
    const wzmianka = new RegExp(`^<@!?${client.user.id}>( |)$`);
     if (message.content.match(wzmianka)) {
        const mentionEmbed = new MessageEmbed()
                .setAuthor(`Cześć ${msg.author.username}`)
                .setColor('#00f2fe')
                .setDescription(`**\`Mój prefix na tym serwerze to %\`**
                __**A spis moich komend zobaczysz jeśli wpiszesz %pomoc**__`)
            return msg.channel.send(mentionEmbed);
        }
});

client.on("message", async message => {
    const prefix = "%"

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});




client.login(token);
