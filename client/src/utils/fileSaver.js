import { saveAs } from 'file-saver'

// Function that simple takes in a string, turns it into a blob, then runs the saveAs function to initiate download
function fileDownload(file) {
    const blob = new Blob([file], {type: "text/plain;charset=utf-8"})

    saveAs(blob, 'bot.js')
}

// Blob for the package.json that will be needed to run the bot
const packageBlob = new Blob([`{
    "name": "template-bot",
    "version": "1.0.0",
    "description": "Template bot generated via all-a-bot.herokuapp.com",
    "scripts": {
      "start": "bot.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "discord.js": "^12.3.1",
      "discord.js-poll-embed": "^1.0.2"
    }
}`], {type: "application/json"})