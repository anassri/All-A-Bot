from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from app.models import db, Bot, Rule, User
from sqlalchemy.orm import joinedload
import json

bot_routes = Blueprint('bot', __name__, url_prefix='/api/bots')


@bot_routes.route('', methods=['POST'])
@jwt_required
def index():
    incoming = request.get_json()
    bots = Bot.query.filter_by(user_id=incoming['user_id']).all()
    data = [bot.to_dict() for bot in bots]
    return jsonify(data), 200

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
    print(incoming["rules"])
    new_rules = incoming["rules"]
    bot = Bot.query.get(id)
    if bot:
        bot.name = incoming["bot"]["name"]
        bot.prefix = incoming["bot"]["prefix"]
        for old_rule in bot.rules:
            db.session.delete(old_rule)
        for new_rule in new_rules:
            new_rule_content = json.dumps(new_rule["content"])
            db.session.add(Rule(content=new_rule_content,
                                bot_id=bot.id))
    else:
        bot = Bot(name=incoming["bot"]["name"], prefix=incoming["bot"]["prefix"])
        for new_rule in new_rules:
            new_rule_content = json.dumps(new_rule["content"])
            db.session.add(Rule(content=new_rule_content,
                                bot_id=bot.id))
        db.session.add(bot)
    db.session.commit()
    return jsonify(True)


# Grabbing all published bots for the explore page - Ammar
@bot_routes.route("/all")
def get_all_published_bots():
    bots = Bot.query \
              .filter_by(is_draft=False) \
              .options(joinedload(Bot.owner)) \
              .all()
    data = [{
        "id": bot.id,
        "name": bot.name,
        "description": bot.description,
        "owner": {
            "username": bot.owner.username
        }
    } for bot in bots]
    return jsonify(data=data)

# Grabbing the info of a particular published bots, navigated to from the explore page - Ammar
@bot_routes.route("/detail/<int:id>")
def get_one_published_bot(id):
    bot = Bot.query \
             .filter_by(id=id) \
             .filter_by(is_draft=False) \
             .options(joinedload(Bot.rules)) \
             .options(joinedload(Bot.owner)) \
             .one()
    if bot:
        rules = []
        for rule in bot.rules:
            rules.append({
                "id": rule.id,
                "content": rule.content,
            }) 
        data = {
            "id": bot.id,
            "name": bot.name,
            "description": bot.description,
            "prefix": bot.prefix,
            "owner": {
                "username": bot.owner.username,
            },
            "rules": rules
        } 
        return jsonify(data=data)
    else:
        return jsonify(message="No such bot found!")