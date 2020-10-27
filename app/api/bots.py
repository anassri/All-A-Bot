from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from sqlalchemy.orm import joinedload
from app.models import Bot, Rule, User

bp = Blueprint('bots', __name__, url_prefix='/api/bots')


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


@bp.route('/all')
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
