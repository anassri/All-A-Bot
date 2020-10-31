from flask import Blueprint, jsonify, request
from app.models import db, User, User_Bookmark
from flask_jwt_extended import jwt_required

user_routes = Blueprint('users', __name__, url_prefix='/api/users')


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/bots/bookmarks/add', methods=['POST'])
@jwt_required
def user_bookmarks():
    incoming = request.get_json()
    userBookmark = User_Bookmark(
        userId=incoming['userId'], botId=incoming['botId'])

    db.session.add(userBookmark)
    db.session.commit()

    user = User.query.get(incoming['userId'])
    return jsonify(
        bookmarks=[bookmark.to_dict() for bookmark in user.bookmarks],
        user=user.to_dict())


@user_routes.route('/<int:id>/bots/bookmarks', methods=['GET'])
@jwt_required
def get_user_bookmarks(id):
    print(id)
    user = User.query.get(id)
    print(user.to_dict())
    return jsonify(bookmarks=[bookmark.to_dict() for bookmark in user.bookmarks])
