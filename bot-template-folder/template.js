const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection();

client.once('ready', () => {
    // Simple console indication that the bot is up and running
})

// Events like guild member join and leave can be here, since they do not depend on messages being sent

// Command objects should be defines here, a simple example would be:
/*
 * const command = {
     name: "command name",
     description: "command description",
     execute(message, args) {
         functionality goes in here
     }
 }
 */
// All commands have to be added in via client.commands.set(command.name, command)

// Prefix will be gotten from user selection
prefix = 'placeholder, put user selected prefix here'
// User actions go here for the event of commands that start with a prefix
client.on('message', message => {
    // If the user wants to have both prefixed commands, and non prefixed commands, a separate swtich case for non-prefixed or even containing a substring anywhere
    //      could be put here, but the bot-author check always needs to be the first thing that occurs to prevent endless self-message cycles
    // Checks that the message starts with the set prefix and the the author is not a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Splits the arguments and command based on spaces, regardless of number of spaces
    const args = message.content.slice(prefix.length).split(/ +/);
    // Removes the actual command and prefix from the argument list, allowing for easier manipulation within commands
    const command = args.shift()

    switch(command) {
        // More cases can be added before or after the help case

        // Iterates across all commands and gets the name and description, then sends it to the channel where the command was called
        case 'help':
            client.commands.forEach(command => {
                message.channel.send(`\`\`\`\nName: ${command.name}\nDescription: ${command.description}\n\`\`\``)
            })
            break

        default:
            // Since we will have multiple listeners, its best to not have default do anything, otherwise
            break
    }
})
// Placeholder token variable, will either be inserted by the user directly, or on the frontend at end of generation (either here, or in a .env file later)
token = 'bot token goes here'
// Login function, actually starts up the bot and allows it to be interacted with
// This should always be at the end of the file
const login = async (token) => {
    await client.login(token);
    return;
}

login(token);
