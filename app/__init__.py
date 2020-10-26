import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt

from .models import db, User
from .api import user_routes
from .routes import auth
from .config import Config

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(user_routes.user_routes)
app.register_blueprint(auth.bp)

migrate = Migrate(app, db)

jwt = JWTManager(app)

blacklist = set()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return {'msg': 'Logged out'}, 200


@app.route('/verify_token', methods=['GET'])
@jwt_required
def verify_token():
    return {'msg': 'OK'}, 200


# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
