const { RichEmbed } = require("discord.js");
module.exports = class {
    constructor() {
        this.name = "help",
        this.alias = [""],
        this.usage = "**x!help"
    }

    async run(client, message, args) {
        try{
            let helpEmbed = new RichEmbed()
            .setTitle("__**Creating**__")
            .setDescription(`**x!build**           Choose between different options and build your discord server in less than a minute
            
            __**Security**__
            
            **x!backup          Create & load backups of your servers
            
            ​__**Others**__
            
            **x!help**            Shows this message
            **x!info**            Get Information about Xenon
            **x!invite**          Invite Xenon
            **x!leave**           Let the bot leave
            **x!ping**            Pong
            **x!tiers**           Shows information about Xenon Pro & Turbo
            
            `)
            .setFooter(`Use \`**x!help [command]\` for more info on a command.
            You can also use \`**x!help [category]\` for more info on a category.`)
            .setColor("#5DBCD2")
            message.channel.send(helpEmbed)
        }catch(e) {
            throw e;
        }
    }
}