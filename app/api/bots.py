from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from app.models import db, Bot, Rule, User


bot_routes = Blueprint('bot', __name__, url_prefix='/api/bots')


@bp.route('', methods=['POST'])
@jwt_required
def index():
    incoming = request.get_json()
    print(incoming)

    # bots = Bot.query.filter_by(user_id=incoming['user_id'])
    # data = [bot.to_dict() for bot in bots]
    # return {'bots': data}
    data = [{"name": "bot1"}, {"name": "bot2"}]
    return jsonify(data=data)


@bot_routes.route('/<int:id>', methods=['GET'])
def get_bot(id=0):
    print("Reached the route!")
    bot = Bot.query.get(id)
    if bot:
        return jsonify(bot)
    else:
        return jsonify(message="No such bot found!")


@bot_routes.route('/<int:id>', methods=['POST'])
def post_bot(id=0):
    incoming = request.get_json()
    bot = Bot.query.get(id)
    if bot:
        bot.name = incoming["name"]
        bot.rules = incoming["rules"]
    else:
        bot = Bot(name=incoming["name"], rules=incoming["rules"])
        db.session.add(bot)
    db.session.commit()
    return jsoniy(True)
