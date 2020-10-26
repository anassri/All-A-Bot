from flask import Blueprint, jsonify, request
from app.models import db, Bot

bot_routes = Blueprint('bots', __name__, url_prefix='/api/bots')


@bot_routes.route('/<int:id>', methods=['GET'])
def get_bot(id=0):
    print("Reached the route!")
    bot = Bot.query.get(id)
    if bot:
        return jsonify(bot)
    else:
        return jsonify(message="No such bot found!")
