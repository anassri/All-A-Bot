from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from app.models import Bot, Rule, User

bp = Blueprint('bots', __name__, url_prefix='/api/bots')


@bp.route('', methods=['POST'])
@jwt_required
def index():
    incoming = request.get_json()
    bots = Bot.query.filter_by(user_id=incoming['user_id']).all()
    data = [bot.to_dict() for bot in bots]
    return jsonify(data), 200
