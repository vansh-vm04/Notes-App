# Notes-App

A full stack notes application where users can sign up with Email+OTP or Google and securely manage their notes in one place.

---

##  Features
- User signup using:
  - Email + OTP flow
  - Google OAuth
- Login via Google 
- Validations & proper error messages
- Create and delete notes
- JWT secured authorization, and note actions
- Mobile friendly design replicating the provided assets

---

## Tech Stack
- **Frontend:** React.js (TypeScript), Tailwind CSS
- **Backend:** Node.js (TypeScript), Express
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT, Google OAuth
- **Deployment:** Vercel (frontend) + Render (backend)

---

##  Installation & Build Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/vansh-vm04/Notes-App.git
cd Notes-App
```
### 2. Setup Backend
```bash
git clone https://github.com/vansh-vm04/Notes-App.git
cd Notes-App
```
#### Go to the backend folder:
```bash
cd backend
npm install
```
#### Create a .env file inside backend/ and add:
```bash
MONGO_URL = your_mongodb_url
JWT_SECRET = your_jwt_secret
EMAIL = your-email@gmail.com
MAIL_PASS = your-gmail-pass
FRONTEND_URL = http://localhost:5173
GOOGLE_CLIENT_ID = your_google_client_id
```
#### Run backend:
```bash
npm run dev
```


### 3. Setup Frontend

#### Go to frontend folder:
```bash
cd ../frontend
npm install
```
#### Create a .env file inside frontend/ and add:
```bash
VITE_BACKEND_URL = http://localhost:3000
VITE_FRONTEND_URL = http://localhost:5173
VITE_GOOGLE_CLIENT_ID = your_google_client_id
```

#### Run frontend:
```bash
npm run dev
```


### Important Note -:

#### For authentication to work, you must set up:

- A Google OAuth Client ID (from Google Cloud Console
)
- A Gmail SMTP App Password (from your Google Account → Security → App Passwords)

- A MongoDB instance (local or cloud, e.g., MongoDB Atlas
)

- Without these, signup/login with OTP and Google will not function.

### To Access the App

- Open the frontend in your browser (default: http://localhost:5173).

- Signup/Login using Email+OTP or Google OAuth.

- Create and delete notes after logging in.