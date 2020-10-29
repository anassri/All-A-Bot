// Basic stuff required at the start of each file
let fileStart = `const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
`



// String form of discord.js login function
const loginString = (token) => {
    return `\nconst login = async (token) => {
    await client.login(token)
    return
}
login('${token}')`
}

// Random string generator, used to ensure that generated objects won't create naming conflicts
const randStringMaker = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Builds string represesntations of non-message event listeners
function nonMessageEventsBuidler(events) {

    let onReadyStart = `client.once('ready', () => {
    console.log('Bot is ready to go!')\n`

    events.forEach(event => {
        let eventType = event.trigger.type
        let funcName = `${event.trigger.details.string}_${randStringMaker()}`
        let eventStart = `
function ${funcName}(client) {
    client.on('${eventType}', `

        event.response.forEach(res => {
            if (res.type === 'addRole') {
                    eventStart += autoRoleBuilder(res.details.string)
                    fileStart += eventStart
                    onReadyStart += `    ${funcName}(client)`
            }
        })
    })

    return onReadyStart + '\n})'
}

// Creates string representations of the command objects necessary for discord.js to recognize them as commands, and also sets them to the bot/client
function commandObjectsBuilder(objList) {
    let commandObjects = ``

    objList.forEach(cmd => {
        const varName = cmd.trigger.details.string + '_' + randStringMaker()
        if (cmd.trigger.usesPrefix) {
            let objTemplate = `\n${varName} = {name: '${cmd.trigger.details.string}', async execute(message, args) {`
            cmd.response.forEach(res => {
                if (res.type === "message") {
                    objTemplate += `\n    ${basicResponseBuilder(res.details.string)}\n`
                } else if (res.type === "ban") {
                    objTemplate += `\n    ${banBuilder()}\n`
                } else if (res.type === "emoji") {
                    objTemplate += `\n    ${reactionBuilder(res.details.string)}\n`
                } else if (res.type === "assignRole") {
                    objTemplate += `\n    ${assignRoleBuilder()}`
                }
            })
            commandObjects += objTemplate + `}}\nclient.commands.set(${varName}.name, ${varName})\n`
            // Add else if here for events other than send for when a prefixed command has other actions such as kick, delete, or ban
        } else if (!cmd.trigger.usesPrefix) {
            let objTemplate = `\n${varName} = {name: '${cmd.trigger.details.string}', async execute(message, args) {`
            cmd.response.forEach(res => {
                if (res.type === "message") {
                    objTemplate += `${basicResponseBuilder(res.details.string)}\n`
                }
            })
            commandObjects += objTemplate + `}}\nclient.commands.set(${varName}.name, ${varName})\n`
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

function banBuilder() {
    const banAction = 'message.guild.members.ban(args[0].substring(3, 21))'
    return banAction
}

function reactionBuilder(emojiName) {
    let name = emojiName.trim()
    if (name.includes(':')) {
        name = name.replace(':', '')
    }

    const reactAction = `
    const emoji = await client.emojis.cache.find(emoji => emoji.name === '${emojiName}')
    message.react(emoji)
    `
    return reactAction
}

function assignRoleBuilder() {
    return `    let role = await message.guild.roles.cache.find(x => x.name === args[1]);
    if (!role) {
        message.reply("Role doesn't exist, either create that role or type a valid role");
    } else {
        if (!message.mentions.users.size) {
            return message.reply("you need to tag a user");
        }
        const user = message.mentions.members.first()
        user.roles.add(role);
        message.reply(user.user.username + " is now a " + role.name);
    }`
}

function autoRoleBuilder(roleName) {
    return (
`async member => {
        const role = await member.guild.roles.cache.find(role => role.name === '${roleName}')
        if (!role) {
            role = await member.guild.roles.create({ data: { name: '${roleName}'}})
        }
        member.roles.add(role)
    })
}\n\n`)
}

// Builds the switch case inside a conditional for messages that start with a prefix
function switchCaseWithPrefixBuilder(prefix, commands) {
    let ifStatement = `\n    if (message.content.startsWith('${prefix}')) {\n`

    let args = `        const args = message.content.slice(prefix.length).split(/ +/);\n`

    let cmd = `        const command = args.shift();\n`

    let switchStatement = `        switch(command) { \n`

    commands.forEach(command => {
        switchStatement += (
            `            case '${command.trigger.details.string}':\n                client.commands.get('${command.trigger.details.string}').execute(message, args);\n                break;\n`)
    })

    const defaulter = (
        `            default:\n                message.channel.send('Invalid command')\n                break;\n        }\n    } else {\n`)

    let switchWithDefault = switchStatement + defaulter
    let fullBlock = ifStatement + args + cmd + switchWithDefault


    return fullBlock
}

// Builds all the message listeners in if else if statements for events that are meant to trigger when a message contains certain substring(s)
function substringMatcher(commands) {
    let substringCheck = `        const checkContains = (message, term) => message.content.includes(term)\n`

    let ifStatement = `        if (checkContains(message, client.commands.first().name)) {\n            client.commands.get(client.commands.first().name)\n`

    let elifStatements = ``
    commands.forEach(command => {
        elifStatements += (
            `        } else if (checkContains(message, '${command.trigger.details.string}'));\n            client.commands.get('${command.trigger.details.string}').execute(message);\n`)
    })

    let checks = ifStatement + elifStatements + '        }\n'

    let fullBlock = substringCheck += checks
    return fullBlock
}

// Assembles the final message event handler
function messageEventAssembler(prefix, prefixedCommands, unprefixedCommands) {
    let messageEventStart = `\nclient.on('message', message => {\n    if (message.author.bot) return;\n`

    let prefixVar = `\n    const prefix = '${prefix}'\n`

    let messageEventEnd = `\n    }\n})`

    let switches = switchCaseWithPrefixBuilder(prefix, prefixedCommands) + substringMatcher(unprefixedCommands)

    return messageEventStart + prefixVar + switches + messageEventEnd
}


export function assembleFullFile(prefix, token, commands) {
    let prefixedCommands = []
    let unprefixedCommands = []
    let events = []
    if (commands) {
        commands.forEach(cmd => {
            if (cmd.trigger.usesPrefix) {
                prefixedCommands.push(cmd)
            } else if (!cmd.trigger.usesPrefix && cmd.trigger.type === 'message') {
                unprefixedCommands.push(cmd)
            } else {
                events.push(cmd)
            }
        })
    }

    let evs = ``
    if (events) {
        evs = nonMessageEventsBuidler(events)
    }

    const comObjs = commandObjectsBuilder([...prefixedCommands, ...unprefixedCommands])

    const msgEventHandler = messageEventAssembler(prefix, prefixedCommands, unprefixedCommands)

    const loginFunc = loginString(token)

    const fullBot = fileStart + evs + comObjs + msgEventHandler + loginFunc

    return fullBot
}