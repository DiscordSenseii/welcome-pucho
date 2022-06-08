///////////////////////////////////////

///////////////////////////////////////
const Discord = require('discord.js');

const intents = new Discord.Intents(32767);       

const client = new Discord.Client({ intents });
//////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
let { readdirSync } = require('fs'); 
//////////////////////////////////////////////////////////////////////////////
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync(`./comandos`).filter(file => file.endsWith(".js"));

for(const file of commandFiles){
const command = require(`./comandos/${file}`);
client.commands.set(command.name, command);
}


for(const file of readdirSync (`./comandos/info`)){
if(file.endsWith(".js")){
const command = require(`./comandos/info/${file}`)
client.commands.set(command.name, command)
}
  }

//////////////////////////////////////////

client.on("ready", () => {

console.log("BOT LISTO")

const time = (1000*5)

   let status = [
    [{
      name: ` Minecraft con ??/50k subs`,
      type: "STREAMING"
    }],
    [{
      name: `Puchungo: Playlist- addons epicos`,
      type: "WHATCHING"
    }],
     ]
  setInterval(() => {
    function randomStatus() {
      let rtatus = status[Math.floor(Math.random() * status.length)];
      client.user.setPresence({ activities: rtatus, status: "online" });

    }
    randomStatus()
  }, time)
})

//////////////////////////////////////////

client.on("guildMemberAdd", async member => {

const { MessageAttachment } = require("discord.js");
const { profileImage } = require("discord-arts");

  const User = member.user;
  
const bufferImg = await profileImage(User);
    
const Attachment = new MessageAttachment(bufferImg, "profile.png");


  
const Welcome = new Discord.MessageEmbed()
.setAuthor(". · •「 ¡Alguien mas fue arrastrado a el sotano ! 」• · .")
.setTitle("﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀")
.setColor("RANDOM")
.setDescription(`**\💎 • Bienvenid@ ${User} al servidor ${member.guild.name}**\n \📕 • En este servidor hay reglas para convivir sanamente pasate por #🗃┊reglas\n \🛰️ • Revisa el canal #📕┊información para estar informado( roles, canales etc) \n \🎨 • Entra al canal de #🍡┊autoroles para obtener roles ( colores, menciones etc)`)
.setImage("attachment://profile.png")

member.client.channels.cache.get("952307856147873792").send({ embeds: [Welcome], files: [Attachment] })
  
}) 

//////////////////////////////////////////

client.on('messageCreate', async message => {

let prefix = ".";
                              
if(message.channel.type === "dm")return;
  
  if(message.author.bot)return;
if(!message.content.startsWith(prefix))return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command =  args.shift().toLowerCase()

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

if(cmd){
cmd.execute(client, message, args)

}
})

//////////////////////////////////////////////////////////////////////////////

client.login(process.env.TOKEN)