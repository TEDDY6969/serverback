const { Client, RichEmbed } = require("discord.js");
const { CommandHandler } = require("djs-commands");
const client = new Client({ disableEveryone: true });
const request = require("request")
var approx = require('approximate-number');
const config = require("./config.json");
const CH = new CommandHandler({
    folder: __dirname + "/Commands/",
    prefix: config.prefix 
});

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT); 
setInterval(() => {
  http.get(`http://xenonbot22.glitch.me/`);
}, 280000);


client.on("ready", () => {
    console.log("Ready !");
    client.user.setActivity(`${approx(145000)} Guilds | x!help`, {type: "WATCHING"})
});

const fetch = require('node-fetch');
 
const qs = require('querystring');//Toxic COdes
 
let prefix = "x!";
client.on('message', async message => { //Toxic COdes
    let alias = message.content.split(" ")[0].substring(prefix.length);
    let args = message.content.split(" ").slice(1);
 
    if (alias == 'docs') {
        if (!args[0]) return;
        const query = args.join(" "); //Toxic COdes//Toxic COdes
        const queryString = qs.stringify({  //Toxic COdes
            q: query  
        });
      await fetch(`https://djsdocs.sorta.moe/v2/embed`, {
            params: { src: 'stable', q: query }
        })
            .then(res => res.json())
            .then(async res => {
                try {
                    let i = new RichEmbed();
                    let fields = res.fields;
                    let properties = fields.filter(r => r.name == 'Properties');
                    let methods = fields.filter(r => r.name == 'Methods');
                    let events = fields.filter(r => r.name == 'Events');
                    let params = fields.filter(r => r.name == 'Params');
                    let returns = fields.filter(r => r.name == 'Returns');
                    let examples = fields.filter(r => r.name == 'Examples');
                    i.setColor(res.color);
                    i.setTitle(res.author.name);
                    i.setURL(res.url);
                    i.setDescription(res.description);
                    i.setThumbnail(res.author.icon_url);
                    if (properties.length != 0) {
                        i.addField('- Properties', properties[0].value);
                    }
                    if (methods.length != 0) {
                        i.addField('- Methods', methods[0].value);
                    }
                    if (events.length != 0) {
                        i.addField('- Events', events[0].value);
                    }
                    if (params.length != 0) {
                        i.addField('- Params', params[0].value);
                    }
                    if (returns.length != 0) {
                        i.addField('- Returns', returns[0].value);
                    }
                    if (examples.length != 0) {
                        i.addField('- Examples', examples[0].value);
                    }
                    await message.channel.send(i);
                } catch (e) {
                  throw e;
                }
            });
    } //Toxic COdes
}); //Toxic COdes

client.on("message", async (message) => {

    if(message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if(!cmd) return;

    try{
        cmd.run(client,message,args)
    }catch(e){
        console.log(e)
    }

});

let info = client.emojis.get("655091815401127966") || "ℹ️" //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1

client.on("guildCreate", guild => {
  
      let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
  
    let newserverEmbed = new RichEmbed()
    .setTitle(`${info}  Info`)
    .setDescription(`__Thanks for adding Xenon to your server!__ :smiley:
Use \`x!help\` to get a list of commands. If you need more information, you can look at the [docs](https://docs.discord.club/xenon).
It's also recommended to join our [discord server](https://discord.club/discord) to get notified about future updates.
If you decide to use Xenon, **you and all your members need to accept our [Terms of Service!](https://docs.discord.club/xenon/terms-of-service)**`)
    .setColor("#5DBCD2")
channel.send(newserverEmbed)
})


client.login(config.token)