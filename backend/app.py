import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from models import db, Bicycle, MaintenanceLog, User, Ride

app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bicycles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Init DB
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"message": "BicycleBase backend is running 🚴‍♂️"})

# Serve uploaded files
@app.route("/static/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# ---------------- BICYCLE ROUTES ---------------- #
@app.route("/bicycles", methods=["GET"])
def get_bicycles():
    bikes = Bicycle.query.all()
    return jsonify([bike.to_dict() for bike in bikes]), 200

@app.route("/bicycles", methods=["POST"])
def add_bicycle():
    data = request.get_json()
    new_bike = Bicycle(
        name=data.get("name"),
        brand=data.get("brand"),
        color=data.get("color"),
        image_url=data.get("imageUrl")  # ✅ now expecting "imageUrl" from frontend
    )
    db.session.add(new_bike)
    db.session.commit()
    return jsonify(new_bike.to_dict()), 201

@app.route("/bicycles/<int:id>", methods=["DELETE"])
def delete_bicycle(id):
    bike = Bicycle.query.get(id)
    if not bike:
        return {"error": "Bicycle not found"}, 404
    db.session.delete(bike)
    db.session.commit()
    return {"message": "Bicycle deleted successfully"}, 200

# ---------------- MAINTENANCE ROUTES ---------------- #
@app.route("/maintenance", methods=["GET"])
def get_maintenance_logs():
    logs = MaintenanceLog.query.all()
    return jsonify([log.to_dict() for log in logs]), 200

@app.route("/maintenance", methods=["POST"])
def add_maintenance_log():
    data = request.json
    log = MaintenanceLog(
        bicycle_id=data["bicycle_id"],
        description=data["description"],
        date=data["date"],
        type=data["type"]  # ✅ FIXED: Was data["service_type"]
    )
    db.session.add(log)
    db.session.commit()
    return jsonify(log.to_dict()), 201


@app.route("/maintenance/<int:id>", methods=["PATCH"])
def update_maintenance_log(id):
    log = MaintenanceLog.query.get_or_404(id)
    data = request.json

    log.bicycle_id = data.get("bicycle_id", log.bicycle_id)
    log.description = data.get("description", log.description)
    log.date = data.get("date", log.date)
    log.type = data.get("type", log.type)  # ✅ Using "type" for consistency

    db.session.commit()
    return jsonify(log.to_dict()), 200

@app.route("/maintenance/<int:id>", methods=["DELETE"])
def delete_maintenance_log(id):
    log = MaintenanceLog.query.get_or_404(id)
    db.session.delete(log)
    db.session.commit()
    return jsonify({"message": "Maintenance log deleted"}), 200

# ---------------- USER ROUTES ---------------- #
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    user = User(name=data["name"], email=data.get("email", ""))
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

# ---------------- RIDE ROUTES ---------------- #
@app.route("/rides", methods=["GET"])
def get_rides():
    rides = Ride.query.all()
    return jsonify([ride.to_dict() for ride in rides]), 200

@app.route("/rides", methods=["POST"])
def add_ride():
    data = request.json
    ride = Ride(
        date=data["date"],
        distance_km=data["distance_km"],
        notes=data.get("notes", ""),
        user_id=data["user_id"],
        bicycle_id=data["bicycle_id"]
    )
    db.session.add(ride)
    db.session.commit()
    return jsonify(ride.to_dict()), 201

if __name__ == "__main__":
    app.run(debug=True)
