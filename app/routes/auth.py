from flask import Blueprint, jsonify, request, redirect
from flask_jwt_extended import create_access_token
from app.models import db, User
from app.oauth import Oauth

bp = Blueprint('auth', __name__, url_prefix='')


@bp.route('/signup', methods=['POST'])
def signup():
    incoming = request.get_json()

    # TODO: Update user model
    user = User(
        username=incoming['username'],
        email=incoming['email'],
        password=incoming['password']
    )

    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='User with that email already exists'), 409

    token = create_access_token(identity=user.email)
    return jsonify(user=user.to_dict(), token=token)


@bp.route('/login', methods=['POST'])
def login():
    incoming = request.get_json()
    user = User.query.filter_by(email=incoming['email']).one()
    # TODO: Update user model
    if user and user.check_password(incoming['password']):
        token = create_access_token(identity=user.email)
        return jsonify(user=user.to_dict(), token=token)
    else:
        print('error')
        return {'msg': 'Incorrect email or password'}, 400


@bp.route('/auth', methods=['GET'])
def auth():
    print(Oauth.discord_login_url)
    return redirect(Oauth.discord_login_url)


@bp.route('/auth/redirect', methods=['GET'])
def auth_redirect():
    code = request.args.get('code')
    access_token = Oauth.get_access_token(code)
    return access_token
