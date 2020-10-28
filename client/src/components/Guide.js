import React from "react"

function Guide() {
    return(
        <div>
            <h3>Guide</h3>
            <div>
                <h4>Step 1</h4>
                <p>
                    To use any bot generated from this site, you must first install Node.js (This app uses 12.19.0, so that version or newer should work)
                    This is the essential for both running the bot, and downloading other dependencies the bot needs, which will be covered in a later section.
                </p>
            </div>
            <div>
                <h4>Step 2</h4>
                <p>
                    The next step is to download your bot's file, which should be named bot.js, and put that into a folder thats preferably empty. When you download it,
                    a prompt will appear asking for a bot token. This is something you get from the discord developer portal, where you can name your bot and give it an image.
                    You will also need to download the package.json, which you should get a prompt for at the same time as downloading your bot.js file, and put that into the same folder as the bot.js file.
                    Do not worry, the bot token is only used locally and is never sent anywhere, so it is secure, as long as you do not share your bot.js file.
                </p>
            </div>
            <div>
                <h4>Step 3</h4>
                <p>
                    Now, you will want to open up your command prompt/terminal, then navigate to the folder where you put the files from the previous step. Inside this folder, you will want to
                    type in "npm install" then hit enter/return. This downloads the files the bot needs to run.
                </p>
            </div>
            <div>
                <h4>Step 4</h4>
                <p>
                    The final step is to start your bot. While still in the command prompt/termin, simply type "node bot.js", and your bot should come online!
                    To get your bot into a server, you will need to invite it. A good webiste for generating your bot invite link is <a href="https://discordapi.com/permissions.html" target="_blank">this one</a>.
                    You must have sufficient permissions within a server to be able to invite your bot into it. The bot is running locally on your computer, and will only run as long you keep it running
                    inside of the command prompt/terminal. To end it manually, hit Ctrl+C for windows, and Command+C on mac.
                </p>
            </div>
            <div>
                <h4>Additional Information</h4>
                <p>
                    If you want to host your bot on a remote server, such as heroku, there are some extra steps to take. First, you will want to edit your bot.js file to no longer contain your bot token.
                    It will instead get the token from something called an environment variable. There are many guides out there on hosting your discord bot remotely, so feel free to search around.
                    Just make sure to keep your bot token secret, otherwise it may become compromised. Compromised bot tokens aren't fun (trust me, I know). If your token does get compromised,
                    you can regenerate your token on the discord developer portal.
                </p>
            </div>
        </div>
    )
}

export default Guide