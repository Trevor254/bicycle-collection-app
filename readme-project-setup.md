# 🚴‍♂️ Bicycle Collection App

A full-stack web application for managing personal bicycle details, maintenance logs, user rides, and upgrades.

---

## 🔧 Technologies Used

- **Frontend**: React (with Yarn), React Router
- **Backend**: Flask, Flask-SQLAlchemy, Flask-CORS
- **Database**: SQLite

---

## 🛠️ Features

- Add, edit, and delete bicycles
- Log and manage maintenance records
- View and add user rides
- Basic user management
- Progress bar indicator for maintenance completion
- Four models: Bicycles, Maintenance Logs, Users, Rides
- One many-to-many relationship (Users ↔ Rides)

---

## 📂 Project Structure

bicycle-collection-app/ ├
── backend/ # Flask app │ 
 ├── app.py │ 
├── models.py │
 └── ...
├── frontend/ # React app (Yarn) │ ├── src/ │ └── ... └── README.md


---

## 🧑‍💻 Getting Started

### 🔗 Clone the Repo

```bash
git clone https://github.com/your-username/bicycle-collection-app.git
cd bicycle-collection-app

#Running the app

#Backend setup

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Make sure to have flask, flask-cors, and flask-sqlalchemy installed.

# Front end setup ( yarn )

cd frontend
yarn install
yarn start

The React frontend will run on http://localhost:3000.

🤝 Contributing
Fork the repository, create a feature branch, and submit a pull request!

Introduction section 

/home/trevor/Desktop/BicycleBase/bicycle-base/public/images/bicycle-1838972_1280.jpg

features section
/home/trevor/Desktop/BicycleBase/bicycle-base/public/images/cycling-7564103_1280.jpg