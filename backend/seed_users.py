from app import app, db
from models import User

with app.app_context():
    # Clear existing users to avoid duplicate errors
    User.query.delete()
    db.session.commit()

    # Create users with hashed passwords
    user1 = User(name='Alice', email='alice@example.com')
    user1.set_password('alicepass')

    user2 = User(name='Bob', email='bob@example.com')
    user2.set_password('bobpass')

    user3 = User(name='Charlie', email='charlie@example.com')
    user3.set_password('charliepass')

    db.session.add_all([user1, user2, user3])
    db.session.commit()
    print("✅ Users seeded successfully with hashed passwords")
