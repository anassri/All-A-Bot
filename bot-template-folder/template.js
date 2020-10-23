const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection();

client.once('ready', () => {
    // Simple console indication that the bot is up and running
    console.log('Bot is ready to go!')
})

// Prefix will be gotten from user selection, ! is there as a placeholder
prefix = '!'
// User actions go here for the event of commands that start with a prefix
client.on('message', message => {
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

// Login function, actually starts up the bot and allows it to be interacted with
const login = async (token) => {
    await client.login(token);
    return;
}

login();

// Function defenitions of commands go here
// Each command has to be added to the client via "client.commands.set(command.name, command)"