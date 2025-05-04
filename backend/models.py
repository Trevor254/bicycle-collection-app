from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class Bicycle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(50))
    image_url = db.Column(db.String(255))

    maintenance_logs = db.relationship('MaintenanceLog', backref='bicycle', cascade="all, delete-orphan", lazy=True)
    rides = db.relationship('Ride', backref='bicycle', cascade="all, delete-orphan", lazy=True)  # New relationship

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "color": self.color,
            "imageUrl": self.image_url,
            "maintenanceLogs": [log.to_dict() for log in self.maintenance_logs],
            "rides": [ride.to_dict() for ride in self.rides]
        }


class MaintenanceLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)

    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycle.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "bicycle_id": self.bicycle_id,
            "description": self.description,
            "service_type": self.type
        }


# ✅ New: User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128), nullable=False)

    rides = db.relationship('Ride', backref='user', cascade="all, delete-orphan", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "rides": [ride.to_dict() for ride in self.rides]
        }


# ✅ New: Ride model
class Ride(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    distance_km = db.Column(db.Float, nullable=False)
    notes = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycle.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "distance_km": self.distance_km,
            "notes": self.notes,
            "user_id": self.user_id,
            "bicycle_id": self.bicycle_id
        }
