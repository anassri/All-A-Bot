from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from app.models import db, Bot, Rule, User
from sqlalchemy.orm import joinedload


bot_routes = Blueprint('bot', __name__, url_prefix='/api/bots')


@bot_routes.route('', methods=['POST'])
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
    # bot = Bot.query.get(id)
    bot = db.session.query(Bot).options(joinedload(Bot.rules)).filter_by(id=id).one()
    if bot:
        rules = []
        for rule in bot.rules:
            rules.append({
                'botId': bot.id,
                'prefix': rule.prefix,
                'content': rule.content,
            })
        print(rules)
        return jsonify({
            'name': bot.name,
            'userId': bot.user_id,
            'rules': rules
        })
    else:
        return jsonify(message="No such bot found!")


@bot_routes.route('/<int:id>', methods=['POST'])
def post_bot(id=0):
    incoming = request.get_json()
    bot = Bot.query.get(id)
    if bot:
        bot.name = incoming["bot"]["name"]
        bot.rules = incoming["bot"]["rules"]
    else:
        bot = Bot(name=incoming["bot"]["name"])
        for rule in incoming["rules"]:
            new_rule = Rule(content=rule.content, bot_id=bot.id)
            db.session.add(new_rule)
        db.session.add(bot)
    db.session.commit()
    return jsoniy(True)
