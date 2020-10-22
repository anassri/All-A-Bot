### List of features
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

### list of triggers/responses:
# Triggers:
* message matching a particular string/regex
* message from a user with a role matching a particular string/regex
* message from a user with a handle matching a particular string/regex
* emoji reaction matching a particular string/regex
* emoji reaction from a user whose handle matches a particular string/regex
* a user leaving the server whose handle matches a particular string
* a user joining the server whose handle matches a particular string
* it is a certain date or time of day
# Responses:
* post a particular message
* delete the message which triggered the response
* respond with a particular emoji to the message which triggered the response
* delete the most recent message matching a particular string/regex
* react with a particular emoji to the most recent message matching a particular string/regex
* ban the user whose action triggered the response
* ban a user whose handle matches a particular string/regex
* add or remove a particular role from the user who triggered the response
* add or remove a particular role from a user whose handle matches a particular string/regex