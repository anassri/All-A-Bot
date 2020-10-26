# List of features
* Create an account
* Log in
* Create a bot
* See your previously-created bots
* Specify bot behavior with a single (AJAX dynamic) form
* Save a bot to your account
* Upload an avatar image for a bot
* "Preview" a bot by interacting with a live emulation
* Download a bot as a DiscordJS source file

bot specification MVP: call/response with strings
additional features: timed triggers, responses that include adding/removing roles, changing nicknames/channel names, deleting messages/channels, randomness (select a random response, respond only a certain % of the time, etc.), listening for and responding with emoji reacts

# list of triggers/responses:
## Triggers:
* message matching a particular string/regex
  * Starts with/starts with prefix and command name - one text input field for the prefix/command name
  * Contains a string anywhere in a message - one text input field for the trigger string
* message from a user with a role matching a particular string - one text input field for the name of the role
* message from a user with a name matching a particular string/regex - one text input field for the name string (this trigger may be in the form of an additional modifier to the previous one)
* emoji reaction matching a particular string/regex - one text input field for the name of the emoji reaction
* emoji reaction from a user whose name matches a particular string/regex - one text input field for the name string (this trigger may be in the form of an additional modifier to the previous one)
* a user leaving the server whose name matches a particular string - one text input field for the name string
* a user joining the server whose name matches a particular string - one text input field for the name string
* it is a certain date or time of day - one date/time input field
## Responses:
* post a particular message - one text input field for the response message
* delete the message which triggered the response - no input required
* respond with a particular emoji to the message which triggered the response - one text input field for the name of the emoji (not a dropdown since servers may have custom emoji)
* delete the most recent message matching a particular string/regex - one text input field for the matching string
* react with a particular emoji to the most recent message matching a particular string/regex - one text input field for the matching string
* ban the user whose action triggered the response - one dropdown menu for kick/server mute/ban
* ban a user whose name matches a particular string/regex - one dropdown menu for kick/server mute/ban and one text input field for the
* add or remove a particular role from the user who triggered the response - one text input field for the name of the role
* add or remove a particular role from a user whose name matches a particular string/regex - two text input fields: one for the name of the role and one for the the user name string

# Database schema
## Users table
* username
* email
* password

## Bots table
* userId
* name
* description
* developerToken

## Rules table
* botId
* prefix
* content

# Rule strings
## Example
``{
  "trigger": {"message: hi!"}
  "response": ["ban sender", "say 'no greeting in this server!'"]
 }``

 # Routes
 ## Examples (prelimenary)
 /users/[userid] - individual user
 /users/[userid]/bots - all the user's bots
 /bots/[botid] - individual bot
 /bots/[botid]/rules
 /bots/[botid]/rules/[ruleid] - individual rule
 /bots/[botid]/download - download the bot code
