from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import re


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # bots = db.relationship("Bot")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        if not re.match(r'[A-Za-z0-9@#$%^&+=]{8,}', password):
            raise AssertionError(
                'Password must contain 1 capital letter and 1 number')
        if len(password) < 8 or len(password) > 50:
            raise AssertionError(
                'Password must be between 8 and 50 characters')
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Bot(db.Model):
    __tablename__ = 'bots'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    isDraft = db.Column(db.Boolean, nullable=False)
    # developer_token = db.Column(db.String(100))
    # nullable because presumably we want users to be able
    # to create a draft bot before they have a developer token

    owner = db.relationship("User")
    rules = db.relationship("Rules")


class Rule(db.Model):
    __tablename__ = 'rules'

    id = db.Column(db.Integer, primary_key=True)
    bot_id = db.Column(db.Integer, db.ForeignKey("Bot.id"), nullable=False)
    prefix = db.Column(db.String(100))
    # nullable because we want to make it possible to create prefix-less rules
    content = db.Column(db.Text, nullable=False)
    # this is "text" rather than a string because it could be
    # very long in some cases

    bot = db.relationship("Bot")
