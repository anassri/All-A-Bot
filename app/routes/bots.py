from flask import Blueprint, jsonify, request
from app.models import db, Bot

bp = Blueprint('bots', __name__, url_prefix='/bots')


@bp.route('/<int:id>', methods=['GET'])
def get_bot(id=0):
    bot = Bot.query.get(id)
    return bot
