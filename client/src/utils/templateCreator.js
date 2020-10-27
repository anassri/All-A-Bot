// Basic stuff required at the start of each file
const fileStart = `
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('Bot is ready to go!)
})

`
// String form of discord.js login function
const loginString = (token) => {
    `const login = async (${token}) => { await client.login(${token})}`
}

// Random string generator, used to ensure that generated objects won't create naming conflicts
const randStringMaker = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Builds string represesntations of non-message event listeners
function nonMessageEventsBuidler(events) {
    let nonMessageEvents = ``

    events.forEach(event => {
        nonMessageEvents += `client.on('${event.type}') {\n    ${event.action}\n}`
    })

    return nonMessageEvents
}

// Creates string representations of the command objects necessary for discord.js to recognize them as commands, and also sets them to the bot/client
function commandObjectsBuilder(objList) {
    let commandObjects = ``

    objList.forEach(cmd => {
        const varName = cmd.name + randStringMaker()
        if (cmd.trigger.includesOrStarts && cmd.trigger.includesOrStarts === 'starts') {
            // This will fire off if the command/rule's trigger is a starts-with trigger, and its response type is that of send (this is largely for prefixed commands)
            if (cmd.response.send) {
                commandObjects += `\n${varName} = {name: ${cmd.name}, description: ${cmd.description}, async execute(message, args) {${basicResponseBuilder(cmd.response.send)}}}\nclient.commands.set(varName.name, varName)`
            }
            // Add else if here for events other than send for when a prefixed command has other actions such as kick, delete, or ban
        } else if(cmd.trigger.includesOrStarts && cmd.trigger.includesOrStarts === 'includes') {
            // This will fire off if the command/rule's trigger is includes, and its response type is that of send
            if (cmd.response.send) {
                commandObjects += `\n${varName} = {name: ${cmd.name}, description: ${cmd.description}, async execute(message, args) {${basicResponseBuilder(cmd.response.send)}}}\nclient.commands.set(varName.name, varName)`
            }
            // Add else ifs here for events other than send for when a matching substring is found, like kick, delete, or ban
        } else {
            // Add command object creation for any other types we may add (if they don't get put into else ifs as needed)
        }
    })

    return commandObjects
}

// Basic helper function for creating basic send message commands
function basicResponseBuilder(response) {
    return `message.channel.send('${response}')`
}



// Builds the switch case inside a conditional for messages that start with a prefix
function switchCaseWithPrefixBuilder(prefix, commands) {
    let ifStatement = `    if (!message.content.startsWith('${prefix}')) {\n`

    let args = `        const args = message.content.slice(prefix.length).split(/ +/);\n`

    let cmd = `        const command = args.shift();\n`

    let switchStatement = `        swtitch(command) { \n`

    commands.forEach(command => {
        switchStatement += (
            `            case '${command.name}':\n                client.commands.get('${command.name}').execute(message, args);\n                break;\n`)
    })

    const defaulter = (
        `            default:\n                message.channel.send('Invalid command')\n                break;}\n    } else {\n`)

    let switchWithDefault = switchStatement + defaulter
    let fullBlock = ifStatement + args + cmd + switchWithDefault


    return fullBlock
}

// Builds all the message listeners in if else if statements for events that are meant to trigger when a message contains certain substring(s)
function substringMatcher(commands) {
    let substringCheck = `        const checkContains = (message, term) => message.content.contains(term)\n`

    let ifStatement = `        if (checkContain(message, client.commands.first().name)) {\n            client.commands.get(client.commands.first().name)\n`

    let elifStatements = ``
    commands.forEach(command => {
        elifStatements += (
            `        } else if (checkContains(message, '${command.name}')):\n            client.commands.get('${command.name}').execute(message);\n`)
    })

    let checks = ifStatement + elifStatements + '        }'

    let fullBlock = substringCheck += checks
    return fullBlock
}

// Assembles the final message event handler
function messageEventAssembler(prefix, prefixedCommands, unprefixedCommands) {
    let messageEventStart = `client.on('message', message => {\n    if (message.author.bot) return;\n`

    let messageEventEnd = `\n})`

    let switches = switchCaseWithPrefixBuilder(prefix, prefixedCommands) + substringMatcher(unprefixedCommands)

    return messageEventStart + switches + messageEventEnd
}

// Testing console.log
console.log( fileStart + messageEventAssembler('!', [{ name: 'Hello' }, { name: 'Goodbye' }], [{ name: 'olleH'}, { name: 'eybdooG' }]))

// More will be added here later for final assembly and converting string to a js file for download