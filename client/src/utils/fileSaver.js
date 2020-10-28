import { saveAs } from 'file-saver'

// Function that simple takes in a string, turns it into a blob, then runs the saveAs function to initiate download
export function fileDownload(file) {
    const blob = new Blob([file], {type: "text/plain;charset=utf-8"})

    saveAs(blob, 'bot.js')
}

<<<<<<< Updated upstream
// Blob for the package.json that will be needed to run the bot
const packageBlob = new Blob([
=======
// Function for downloading the package.json file
export const packageDownload = () => {
    const packageBlob = new Blob([
>>>>>>> Stashed changes
`{
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

// Function for downloading the package.json file
export const packageDownload = packageBlob => saveAs(packageBlob, 'package.json')