import os
import requests


class Oauth(object):
    client_id = 771154573795655680
    client_secret = '1VyZWyA-cRv31xJlI89QioiywgSp3Dpr'
    scope = 'identify%20email%20connections%20guilds'
    redirect_uri = 'https://all-a-bot.herokuapp.com/auth/redirect'
    discord_login_url = 'https://discord.com/api/oauth2/authorize?client_id=771154573795655680&redirect_uri=https%3A%2F%2Fall-a-bot.herokuapp.com%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20connections%20guilds'
    discord_token_url = 'https://discordapp.com/api/oauth2/token'
    discord_api_url = 'https://discordapp.com/api'

    @staticmethod
    def get_access_token(code):
        payload = {
            'client_id': Oauth.client_id,
            'client_secret': Oauth.client_secret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': Oauth.redirect_uri,
            'scope': Oauth.scope
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        access_token = requests.post(
            url=Oauth.discord_token_url, data=payload, headers=headers)

        print('access_token', access_token.json())
        json = access_token.json()
        return json.get('access_token')

    @staticmethod
    def get_user_json(access_token):
        url = Oauth.discord_api_url+'/users/@me'

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        user_object = requests.get(url=url, headers=headers)
        user_json = user_object.json()
        return user_json
