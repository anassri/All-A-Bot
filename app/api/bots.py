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
    bot = db.session.query(Bot).options(
        joinedload(Bot.rules)).filter_by(id=id).one()
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
            'prefix': bot.prefix,
            'userId': bot.user_id,
            'description': bot.description,
            'isDraft': bot.is_draft,
            'rules': rules
        })
    else:
        return jsonify(message="No such bot found!")


@bot_routes.route('/<int:id>', methods=['POST'])
def post_bot(id=0):
    incoming = request.get_json()
    print(incoming)
    new_rules = incoming["rules"]
    bot = Bot.query.get(id)
    if bot:
        bot.name = incoming["bot"]["name"]
        bot.prefix = incoming["bot"]["prefix"]
        bot.user_id = incoming["bot"]["userId"]
        bot.description = incoming["bot"]["description"]
        bot.is_draft = incoming["bot"]["isDraft"]
        for old_rule in bot.rules:
            db.session.delete(old_rule)
        for new_rule in new_rules:
            new_rule_content = json.dumps(new_rule["content"])
            db.session.add(Rule(content=new_rule_content,
                                bot_id=bot.id))
    else:
        bot = Bot(name=incoming["bot"]["name"],
                  prefix=incoming["bot"]["prefix"],
                  user_id=incoming["bot"]["userId"],
                  description=incoming["bot"]["description"],
                  is_draft=incoming["bot"]["isDraft"])
        db.session.add(bot)
        db.session.commit()
        print(bot)
        for new_rule in new_rules:
            new_rule_content = json.dumps(new_rule["content"])
            db.session.add(Rule(content=new_rule_content,
                                bot_id=bot.id))
    db.session.commit()
    return jsonify(True)


@bot_routes.route('/<int:id>', methods=['DELETE'])
@jwt_required
def delete_bot(id):
    bot = Bot.query.get(id)
    db.session.delete(bot)
    db.session.commit()
    return jsonify({"msg": f'{bot.name} deleted'})


# Grabbing all published bots for the explore page - Ammar
@bot_routes.route("/all")
def get_all_published_bots():
    bots = Bot.query \
              .filter_by(is_draft=False) \
              .options(joinedload(Bot.owner)) \
              .all()
    data = [bot.to_dict() for bot in bots]
    return jsonify(data=data)

@bot_routes.route('/complete')
def get_all_bots():
    bots = Bot.query \
              .options(joinedload(Bot.owner)) \
              .all()
    data = [bot.to_dict() for bot in bots]
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
