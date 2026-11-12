

✅ Completed Features

Feature

Implementation

Status

User Authentication

JWT authentication using HTTP-only cookies

Completed

Password Security

Password hashing using bcrypt

Completed

User Profile Management

Protected profile access and profile updates

Completed

Food Listing

Displaying available food items

Completed

Shopping Cart

Cart interface for managing food items

Completed

Docker Containerization

Frontend and backend containerization using Docker Compose

Completed

Razorpay Payment Gateway

Online payment integration using Razorpay

Completed

Payment Order Creation

Creating payment orders through Razorpay

Completed

Payment Verification

Verifying payment transactions

Completed

Idempotency Keys

Preventing duplicate payment processing during retries

Completed
## 🚧 Project Roadmap – Upcoming Features

HomeFood is an actively evolving project. The following features are planned for future development to improve scalability, security, performance and real-time user experience.

| Feature | Planned Implementation | Status |
|---|---|---|
| Redis | Caching frequently accessed data and improving API performance | Planned |
| RBAC | Role-Based Access Control for Customers, Restaurant Admins and Super Admins | Planned |
| Rate Limiting | Protecting APIs against excessive requests and brute-force attacks | Planned |
| Socket.IO | Real-time order status updates and notifications | Planned |
| OAuth 2.0 | Google authentication and social login | Planned |
| CI/CD | Automated testing, Docker image builds and deployment using GitHub Actions | Planned |

### Development Goals

- Improve application scalability and performance.
- Strengthen API security and access control.
- Implement reliable payment processing.
- Introduce real-time order tracking.
- Automate testing and deployment workflows.

These enhancements will be implemented incrementally as part of the project's ongoing development.

****Currently I have done below ****

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

## 🐳 Running HomeFood Using Docker

HomeFood is containerized using Docker and Docker Compose. Developers do not need to install Node.js, Yarn, or application dependencies on their local machines.

### Prerequisites
- Git
- Docker
- Docker Compose
- MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone https://github.com/nischi123/HomeFood.git
cd HomeFood
```

### 2. Configure Environment Variables

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Build and Start the Application

```bash
docker compose up --build
```

Docker automatically builds the frontend and backend images, installs their dependencies, and starts both containers.

### 4. Access the Application

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

### 5. Stop the Application

```bash
docker compose down
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

💳 Payment Integration

HomeFood integrates the Razorpay Payment Gateway to enable secure online payments for food orders.

Integrated Razorpay for online payment processing.

Implemented payment order creation and payment verification.

Added Idempotency Keys to prevent duplicate payment processing during retries.

Improved payment reliability by handling repeated payment requests safely.
## 👨‍💻 Author

**Nischala K**

GitHub: https://github.com/nischi123

---

⭐ If you find this project interesting, feel free to explore the repository!
