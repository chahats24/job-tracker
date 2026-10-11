# TrackIt — Job Application Tracker

TrackIt is a full-stack MERN web application designed to help students and job seekers organize their job search, track application progress, monitor their performance, and prepare for interviews with AI-powered assistance.

🌐 **Live Demo:** [TrackIt](https://trackit-amber-tau.vercel.app/)  
💻 **GitHub Repository:** [chahats24/job-tracker](https://github.com/chahats24/job-tracker)

---

## ✨ Features

- **User Authentication:** Register and log in using JWT-based authentication and bcrypt password hashing.
- **Job Application Management:** Add, view, edit, and delete job applications.
- **Application Status Tracking:** Organize applications using a Kanban board with statuses such as Applied, Interview, Offer, and Rejected.
- **Dashboard Analytics:** Monitor total applications, interviews, offers, and response rate.
- **Application Insights:** Visualize job-search progress and application statistics.
- **Recent Applications:** Quickly view recent applications and their current statuses.
- **AI Interview Preparation:** Generate interview questions using the Groq API.
- **Interview Question Customization:** Practice different question categories and difficulty levels.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Data Visualization | Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| AI Integration | Groq API — Llama 3.3 70B Versatile |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## 🏗️ System Architecture

```text
                   +-------------------+
                   |       User        |
                   +---------+---------+
                             |
                             v
                   +-------------------+
                   |  React Frontend   |
                   |      Vercel       |
                   +---------+---------+
                             |
                       REST API Calls
                             |
                             v
                   +-------------------+
                   | Express + Node.js |
                   |      Render       |
                   +----+----------+---+
                        |          |
                        v          v
                 +-----------+  +-----------+
                 | MongoDB   |  | Groq API  |
                 | Atlas     |  | AI Models |
                 +-----------+  +-----------+
```

---

## 🚀 Getting Started

Follow these steps to run TrackIt locally.

### Prerequisites

- [Node.js and npm](https://nodejs.org/)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)
- A [Groq API key](https://console.groq.com/) for AI-powered functionality
- Git installed on your system

### 1. Clone the Repository

```bash
git clone https://github.com/chahats24/job-tracker.git
cd job-tracker
```

### 2. Set Up the Backend

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory with the environment variables expected by your backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
GROQ_API_KEY=your_groq_api_key
PORT=4000
```

Replace the example values with your actual configuration. Ensure the variable names match those used in your server code.

Start the backend using the development script defined in `server/package.json`. If the script is named `dev`, run:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:4000/api
```

This configures the frontend to communicate with your local backend.

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal by Vite.

### 4. Production Deployment

TrackIt uses the following deployment setup:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Configure production environment variables through the respective hosting dashboards. Set the frontend's `VITE_API_URL` to your deployed backend API URL and configure the backend with the appropriate database connection string and secrets.

---

## 🔐 Security Considerations

- Passwords are hashed using bcrypt rather than stored as plain text.
- Protected API requests use JWT-based authentication.
- Store database credentials, JWT secrets, and AI API keys in environment variables.
- Never commit `.env` files, API keys, or database credentials to GitHub.
- Configure appropriate database access controls and CORS settings for production.

---

## 📁 Project Structure

```text
job-tracker/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/                # Frontend source code
├── server/                 # Express backend
├── .gitignore
└── README.md
```

---

## 🎯 Project Objective

TrackIt aims to simplify job searching by bringing job application management, progress tracking, dashboard analytics, and AI-assisted interview preparation together in one application.

## 👩‍💻 Author

**Chahat Sahni**  
B.Tech — Computer Science and Engineering (Business Systems)  
VIT Vellore

- GitHub: [@chahats24](https://github.com/chahats24)

---

*Built to make the job search more organized and manageable.*