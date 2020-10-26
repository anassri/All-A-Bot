
from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Bot, Rule
# from sqlalchemy import String, Integer, Date
# from alembic import op

# print(db)
ruleString1 = """{ "trigger": { "message": "hi", "includesOrStarts":"start" }, "response": "[{ "send": "Hello!" }]" }"""

ruleString2 = """{ "trigger": { "message": "test", "includesOrStarts":"includes" }, "response": "[{ "send": "The test worked!}]" }"""


# op.bulk_insert('users', [
#     {'username'}
# ])

with app.app_context():
    db.drop_all()
    db.create_all()

    user1 = User(username="anassri", email="fake@email.com", password="demopassword")
    user2 = User(username="ivanhroth", email="fake2@email.com", password="demopassword2")
    user3 = User(username="Cthulhuhub", email="fake3@email.com", password="demopassword3")
    user4 = User(username="matt-ramotar", email="fake4@email.com", password="demopassword4")


    bot1 = Bot(user_id=1, name="fakebot1", description="The first fake bot ever here", is_draft=False)
    bot2 = Bot(user_id=2, name="fakebot2", description="The second fake bot ever here", is_draft=True)
    bot3 = Bot(user_id=3, name="fakebot3", description="The third fake bot ever here", is_draft=True)
    bot4 = Bot(user_id=4, name="fakebot4", description="The fourth fake bot ever here", is_draft=True)
    bot5 = Bot(user_id=1, name="fakebot5", description="The fifth fake bot ever here", is_draft=True)

    rule1 = Rule(bot_id=1, prefix="!", content=ruleString1)
    rule2 = Rule(bot_id=2, prefix=None, content=ruleString2)

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(bot1)
    db.session.add(bot2)
    db.session.add(bot3)
    db.session.add(bot4)
    db.session.add(bot5)
    db.session.add(rule1)
    db.session.add(rule2)

    db.session.commit()
