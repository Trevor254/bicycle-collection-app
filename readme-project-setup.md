# 🚴 Bicycle Collection App

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

bicycle-collection-app/
├── backend/ # Flask app
│ ├── app.py
│ ├── models.py
│ └── ...
├── frontend/ # React app (Yarn)
│ ├── src/
│ └── ...
└── README.md


---

## 🧑‍💻 Getting Started

### 🔗 Clone the Repo

bash
git clone https://github.com/your-username/bicycle-collection-app.git
cd bicycle-collection-app


**▶️ Running the App
📌 Backend Setup**

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

Make sure to have Flask, Flask-CORS, and Flask-SQLAlchemy installed.

💻 Frontend Setup (Yarn)
   bash
   Copy
   Edit
   cd frontend
   yarn install
   yarn start

  The React frontend will run at: http://localhost:3000


  🚀 Deployment
This application is deployed as a full-stack project using Vercel and Render.

🖼 Frontend (React with Yarn)
Hosted on: Vercel

URL: https://your-frontend-url.vercel.app (replace with your live link)

Deployment Notes:

Ensure your frontend folder has a build script in package.json (already present by default in Create React App)

Connect GitHub repo to Vercel

link: https://bicycle-collection-app-ejd5-git-main-trevor-richards-projects.vercel.app/

Set the Build Command to:

bash

yarn build
Set the Output Directory to:
bash
build

Add env variable if needed:

env
REACT_APP_API_BASE_URL=https://bicycle-backend.onrender.com

🔧 Backend (Flask)
Hosted on: Render

URL: https://bicycle-backend.onrender.com

Deployment Notes:

Create a Web Service in Render and connect your backend repo

Set:

Build Command: pip install -r requirements.txt

Start Command: gunicorn app:app

Ensure static files (e.g. uploaded images) are served correctly

Enable CORS for your frontend domain

🖼️ UI Sections
🏁 Introduction Section Background
/home/trevor/Desktop/BicycleBase/bicycle-base/public/images/bicycle-1838972_1280.jpg
(Used as a background for the homepage introduction)

📦 Features Section Background
/home/trevor/Desktop/BicycleBase/bicycle-base/public/images/cycling-7564103_1280.jpg
(Used as background for homepage feature cards)

🤝 Contributing
Feel free to fork the repo, create a new branch, and submit a pull request!


