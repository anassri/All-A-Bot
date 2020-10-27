import { saveAs } from 'file-saver'

function fileDownload(file) {
    const blob = new Blob([file], {type: "text/plain;charset=utf-8"})

    saveAs(blob, 'bot.js')
}

const packageBlob = new Blob([`{
    "name": "template-bot",
    "version": "1.0.0",
    "description": "Tempate bot generated via all-a-bot.herokuapp.com",
    "scripts": {
      "start": "template.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "discord.js": "^12.3.1",
      "discord.js-poll-embed": "^1.0.2"
    }
}`], {type: "application/json"})