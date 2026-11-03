# 🍽️ HomeFood – Food Ordering Application

HomeFood is a full-stack food ordering application developed using React.js, Node.js, Express.js, and MongoDB. It provides a user-friendly interface for exploring food items and managing user accounts and cart details.

The application uses JWT-based authentication with HTTP-only cookies to protect user sessions. Docker and Docker Compose are used to containerize and run the frontend and backend applications.

## 🚀 Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### DevOps & Tools
- Docker
- Docker Compose
- Git
- GitHub
- Postman

## ✨ Features

- User Registration
- User Login and Authentication
- Password Hashing using bcrypt
- JWT Authentication using HTTP-only Cookies
- Protected User Profile
- User Profile Management
- Food Item Display
- Shopping Cart Interface
- Responsive User Interface
- Dockerized Frontend and Backend

## 📁 Project Structure

```text
HomeFood/
│
├── Backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   │   └── images/
│   ├── App.jsx
│   ├── App.css
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Cart.jsx
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js
- Yarn or npm
- MongoDB (local installation or MongoDB Atlas)
- Docker
- Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/nischi123/HomeFood.git
```

Navigate into the project:

```bash
cd HomeFood
```

### 2. Configure Backend Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own MongoDB connection string and a strong JWT secret.

**Important:** Never upload your actual `.env` file or credentials to GitHub.

### 3. Run the Backend

```bash
cd Backend
yarn install
yarn dev
```

Backend runs at:

```text
http://localhost:5000
```

### 4. Run the Frontend

Open another terminal:

```bash
cd Frontend
yarn install
yarn dev
```

Frontend runs at:

```text
http://localhost:5173
```

## 🐳 Running the Application Using Docker

HomeFood supports Docker containerization for both frontend and backend applications.

### Build and Start Containers

From the project root, run:

```bash
docker compose up --build
```

This command builds the frontend and backend Docker images and starts both containers.

### Check Running Containers

```bash
docker compose ps
```

### View Application Logs

```bash
docker compose logs
```

### Stop Containers

```bash
docker compose down
```

### Application URLs

| Application | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

## 🔐 Authentication

HomeFood implements JWT-based authentication.

Authentication workflow:

1. Users register with a username and password.
2. Passwords are hashed using bcrypt before storing them in MongoDB.
3. During login, the submitted password is verified against the stored hash.
4. A JWT is generated after successful authentication.
5. The JWT is stored in an HTTP-only cookie.
6. Authentication middleware verifies the JWT before allowing access to protected routes.

## 👨‍💻 Author

**Nischala K**

GitHub: https://github.com/nischi123

---

⭐ If you find this project interesting, feel free to explore the repository!
