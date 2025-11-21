
# 🚗 BMW Car Showcase & Booking Website

A **Full Stack Web Development Project** built using **HTML, CSS, JavaScript, Node.js, Express, and SQLite**.  
This website allows users to explore BMW car models, sign up/login, book test drives, and contact the showroom easily.

---

## 🏗️ Project Overview

**Frontend:**  
- HTML, CSS, and JavaScript  
- Responsive BMW-themed UI  
- Pages: Home, About, Models, M4, Login, Signup, Contact, Dashboard  

**Backend:**  
- Node.js + Express.js server  
- SQLite database using `better-sqlite3`  
- API routes for authentication, bookings, and contact form submissions  

---

## ⚙️ Features

### 👤 Authentication
- Signup and Login system with **bcrypt** password hashing  
- Session handling using **cookie-session**

### 🚘 Booking System
- Logged-in users can **book test drives** for BMW models  
- Bookings stored in database with user reference  

### 💬 Contact Page
- Visitors can send messages via contact form  
- Saves **name, phone, WhatsApp, email, message** in database  

### 📊 Dashboard
- Displays all bookings made by the logged-in user  

---

## 🧩 Folder Structure

bmw/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── .env
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   └── contact.js
│   └── bmw.sqlite
│
└── frontend/
    ├── bmw.html
    ├── about.html
    ├── models.html
    ├── M4.html
    ├── signup.html
    ├── login.html
    ├── contact.html
    ├── dashboard.html
    └── app.js

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/bmw-project.git
cd bmw-project/backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the backend server
```bash
npm run dev
```
Server will start at http://localhost:3000

### 4️⃣ Open the frontend
Visit `http://localhost:3000/bmw.html` in your browser.

---

## 🧱 Technologies Used

| Layer | Technology |
|--------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | SQLite (better-sqlite3) |
| Session | cookie-session |
| Password Security | bcrypt |
| Unique IDs | uuid |
| Environment Variables | dotenv |

---

## 📦 Environment Variables

Create a `.env` file inside `/backend`:

---


---

## ✨ Future Improvements
- Add admin dashboard for managing bookings & contacts  
- Integrate MySQL or MongoDB for larger data  
- Add email confirmation for bookings  

---

## 👨‍💻 Author
**Developed by: Harshath K
**Stack:** Full Stack (Node.js + Express + SQLite)  
