
from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Bot, Rule
# from sqlalchemy import String, Integer, Date
# from alembic import op

# print(db)
ruleString1 = """{ "trigger": { "type": "message", "usesPrefix": true, "details": { "string": "hi" } }, "response": [{ "type": "message", "details": { "string": "hi there!" } }, { "type": "emoji", "details": { "string": "Appacademylogo" } }] }"""

ruleString2 = """{ "trigger": { "type": "message", "usesPrefix": true, "details": { "string": "bye" } }, "response": [{ "type": "message", "details": { "string": "goodbye friend!" } }] }"""

ruleString3 = """{ "trigger": { "type": "guildMemberAdd", "usesPrefix": false, "details": {"string": "noob" } }, "response": [{ "type": "addRole", "details": { "string": "noob" } }] }"""

ruleString4 = """{ "trigger": { "type": "message", "usesPrefix": true, "details": {"string": "addRole" } }, "response": [{ "type": "assignRole", "details": { "string": "" } }] }"""

ruleString5 = """{ "trigger": { "type": "guildMemberRemove", "usesPrefix": false, "details": { "string": "general" } }, "response": [{ "type": "message", "details": { "string": "user has left the server" } }] }"""

ruleString6 = """{ "trigger": { "type": "guildMemberAdd", "usesPrefix": false, "details": { "string": "Student" } }, "response": [{ "type": "addRole", "details": { "string": "Student" } }] }"""

ruleString7 = """{ "trigger": { "type": "message", "usesPrefix": false, "details": { "string": "cowabunga"} }, "response": [{ "type": "ban", "details": { "string": "" } }] }"""
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


    bot1 = Bot(user_id=1, name="fakebot1", prefix="!", description="The first fake bot ever here", is_draft=False)
    bot2 = Bot(user_id=2, name="fakebot2", prefix= "@", description="The second fake bot ever here", is_draft=False)
    bot3 = Bot(user_id=3, name="fakebot3", prefix="#", description="The third fake bot ever here", is_draft=False)
    bot4 = Bot(user_id=4, name="fakebot4", prefix="//", description="The fourth fake bot ever here", is_draft=False)
    bot5 = Bot(user_id=1, name="fakebot5", prefix= "%", description="The fifth fake bot ever here", is_draft=True)
    bot6 = Bot(user_id=1, name="fakebot6", prefix= "%", description="The fifth fake bot ever here", is_draft=False)
    bot7 = Bot(user_id=1, name="fakebot7", prefix= "%", description="The fifth fake bot ever here", is_draft=False)
    bot8 = Bot(user_id=1, name="fakebot8", prefix= "%", description="The fifth fake bot ever here", is_draft=False)

    rule1 = Rule(bot_id=1, content=ruleString1)
    rule2 = Rule(bot_id=2, content=ruleString2)
    rule3 = Rule(bot_id=1, content=ruleString3)
    rule4 = Rule(bot_id=4, content=ruleString5)
    rule5 = Rule(bot_id=4, content=ruleString6)
    rule6 = Rule(bot_id=6, content=ruleString6)
    rule7 = Rule(bot_id=1, content=ruleString7)

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(bot1)
    db.session.add(bot2)
    db.session.add(bot3)
    db.session.add(bot4)
    db.session.add(bot5)
    db.session.add(bot6)
    db.session.add(bot7)
    db.session.add(bot8)
    db.session.add(rule1)
    db.session.add(rule2)
    db.session.add(rule3)
    db.session.add(rule4)
    db.session.add(rule5)
    db.session.add(rule6)
    db.session.add(rule7)

    db.session.commit()
