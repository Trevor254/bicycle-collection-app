from app import app, db
from models import User

with app.app_context():
    # Clear existing users to avoid duplicate email error
    User.query.delete()
    db.session.commit()

    db.session.add_all([
        User(name='Alice', email='alice@example.com'),
        User(name='Bob', email='bob@example.com'),
        User(name='Charlie', email='charlie@example.com'),
    ])
    db.session.commit()
    print("✅ Users seeded successfully")
