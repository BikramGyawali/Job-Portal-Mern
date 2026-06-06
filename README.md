# 💼 Job Portal - MERN Stack Application

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Latest-black?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Flowbite](https://img.shields.io/badge/Flowbite-Components-5B4DF0?logo=javascript)](https://flowbite.com/)

A modern, full-stack job portal application built with the MERN stack. This platform connects job seekers with employers, providing an intuitive interface for job browsing, applications, and management.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🎨 Setup Guide: Flowbite & Tailwind CSS](#-setup-guide-flowbite--tailwind-css)
- [🗂️ Project Structure](#-project-structure)
- [🔧 Environment Configuration](#-environment-configuration)
- [📸 Screenshots](#-screenshots--pages)
- [🚀 Running the Application](#-running-the-application)
- [📝 API Endpoints](#-api-endpoints-backend)
- [🔐 Security Features](#-security-features)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **🔐 Authentication & Authorization**
  - Secure user registration and login (Job Seeker & Employer)
  - JWT-based authentication
  - Role-based access control

- **💼 Job Management**
  - Browse and search job listings
  - Apply for jobs with ease
  - Track application status
  - Manage job postings (Employers)

- **👤 User Profiles**
  - Comprehensive profile management
  - Resume upload and management
  - Job preference settings

- **📊 Dashboard**
  - Personalized job seeker dashboard
  - Employer recruitment dashboard
  - Application tracking

- **🎨 Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Beautiful components with Flowbite
  - Smooth animations and transitions
  - Mobile-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Flowbite React** - Pre-built UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **FontAwesome** - Icon set
- **html2canvas & jsPDF** - PDF generation

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload handling
- **Nodemon** - Development server auto-reload
- **Jest & Supertest** - Testing framework

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)
- **Cloudinary Account** - [Sign up](https://cloudinary.com/) (for image uploads)

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/BikramGyawali/Job-Portal-Mern.git
cd Job-Portal-Mern
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables (see Configuration section)

# Start the development server
npm start
```

The backend server will run on `http://localhost:5000` (or your configured port)

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default)

---

## 🎨 Setup Guide: Flowbite & Tailwind CSS

### Tailwind CSS Setup (Already Configured)

Tailwind CSS v4 is pre-configured in this project. The configuration is located in:

```
frontend/
├── tailwind.config.js
├── postcss.config.js
└── src/index.css
```

**Key Features:**
- Utility-first CSS framework
- JIT (Just-In-Time) compilation
- Full customization support

**Usage Example:**
```jsx
<div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6">
  <h1 className="text-2xl font-bold text-white">Welcome to Job Portal</h1>
</div>
```

### Flowbite Setup (Already Configured)

Flowbite React components are integrated for beautiful, pre-styled UI elements.

**Pre-installed packages:**
```json
{
  "flowbite": "^3.1.2",
  "flowbite-react": "^0.12.10"
}
```

**Available Components:**
- Buttons, Cards, Modals, Navigation bars
- Forms, Input fields, Dropdowns
- Alerts, Badges, Tables
- Tooltips, Pagination, Breadcrumbs
- And many more...

**Usage Example:**
```jsx
import { Button, Card, Badge } from 'flowbite-react';

export default function JobCard() {
  return (
    <Card>
      <h2 className="text-xl font-bold">Senior Developer</h2>
      <Badge color="green">Active</Badge>
      <p className="text-gray-600">Join our team...</p>
      <Button>Apply Now</Button>
    </Card>
  );
}
```

**To use Flowbite components:**
1. Import from `flowbite-react`
2. Combine with Tailwind CSS classes for customization
3. Refer to [Flowbite Documentation](https://flowbite-react.com/)

---

## 🗂️ Project Structure

### Frontend Structure

```
frontend/
├── public/                 # Static assets
│   ├── logo.png
│   └── vite.svg
├── src/
│   ├── assets/             # Images, icons, media files
│   │   ├── image/
│   │   │   ├── home3.png
│   │   │   ├── about.jpeg
│   │   │   ├── login.png
│   │   │   ├── jobs.jpeg
│   │   │   ├── jobsAlert.jpg
│   │   │   ├── dashboard.png (placeholder)
│   │   │   └── ... (other UI images)
│   │   └── logo.png
│   ├── components/         # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── JobCard.jsx
│   │   └── ... (more components)
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Jobs.jsx
│   │   ├── Dashboard.jsx
│   │   ├── JobDetails.jsx
│   │   ├── EmployerDashboard.jsx
│   │   └── NotFound.jsx
│   ├── sections/           # Page sections/blocks
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── JobList.jsx
│   │   └── ...
│   ├── context/            # React Context (State Management)
│   │   ├── AuthContext.jsx
│   │   └── JobContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── ...
│   ├── services/           # API services
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   ├── userService.js
│   │   └── api.js
│   ├── utils/              # Utility functions
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── data/               # Static data
│   │   └── mockData.js
│   ├── layout/             # Layout components
│   │   └── MainLayout.jsx
│   ├── routes/             # Route configurations
│   │   └── index.jsx
│   ├── App.jsx             # Root component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles + Tailwind
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── package-lock.json
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── eslint.config.js        # ESLint configuration
└── .env                    # Environment variables

```

### Backend Structure

```
backend/
├── src/
│   ├── config/             # Configuration files
│   │   ├── database.js     # MongoDB connection
│   │   ├── cloudinary.js   # Cloudinary setup
│   │   └── env.js          # Environment config
│   ├── models/             # Mongoose schemas
│   │   ├── User.js         # User model
│   │   ├── Job.js          # Job listing model
│   │   ├── Application.js  # Job application model
│   │   └── Profile.js      # User profile model
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── userController.js
│   │   └── ...
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   ├── users.js
│   │   └── index.js
│   ├── middlewares/        # Express middlewares
│   │   ├── auth.js         # JWT verification
│   │   ├── errorHandler.js # Error handling
│   │   ├── validation.js   # Input validation
│   │   └── upload.js       # File upload
│   ├── services/           # Business logic
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   ├── emailService.js
│   │   └── ...
│   └── utils/              # Utility functions
│       ├── validators.js
│       ├── helpers.js
│       └── constants.js
├── public/                 # Static files
├── tests/                  # Test files
│   ├── auth.test.js
│   ├── jobs.test.js
│   └── ...
├── app.js                  # Express app setup
├── package.json            # Dependencies
├── package-lock.json
├── .env                    # Environment variables
├── .gitignore
└── README.md

```

---

---

## 📸 Screenshots & Pages

### Home Page
![Home Page](./frontend/src/assets/image/home3.png)
*Landing page showcasing job portal features and call-to-action buttons*

### About Page
![About Page](./frontend/src/assets/image/about.jpeg)
*Learn more about our platform and mission*

### Login Page
![Login Page](./frontend/src/assets/image/login.png)
*Secure login for job seekers and employers*

### Job Listings
![Jobs Page](./frontend/src/assets/image/jobs.jpeg)
*Browse available job opportunities*

### Job Alerts
![Job Alerts](./frontend/src/assets/image/jobsAlert.jpg)
*Get notified about relevant job postings*

### Dashboard
![Dashboard](./frontend/src/assets/image/dashboard.png)
*User dashboard for managing applications and profile*

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Linting

```bash
cd frontend
npm run lint
```

---

## 📝 API Documentation

For comprehensive API documentation, tests, and request examples, please refer to our **Postman Collection**:

### 📖 Postman API Documentation
**[View API Documentation →](https://documenter.getpostman.com/view/38226013/2sBXqNmJAQ)**

This documentation includes:
- ✅ All available endpoints
- ✅ Request/response examples
- ✅ Authentication headers
- ✅ Error handling
- ✅ Testing examples

**Or Import the Collection:**
```
https://documenter.getpostman.com/view/38226013/2sBXqNmJAQ
```

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token

#### Jobs
- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get specific job
- `POST /api/jobs` - Create new job (Employer)
- `PUT /api/jobs/:id` - Update job (Employer)
- `DELETE /api/jobs/:id` - Delete job (Employer)

#### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications` - Get user applications
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application status

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-resume` - Upload resume

---

## 🔐 Security Features

✅ **Password Encryption** - Bcrypt hashing for password security
✅ **JWT Authentication** - Secure token-based authentication
✅ **CORS Protection** - Cross-origin resource sharing configured
✅ **Input Validation** - Server-side validation of all inputs
✅ **Error Handling** - Comprehensive error handling and logging
✅ **Environment Variables** - Sensitive data stored securely

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Bikram Gyawali**
- Portfolio: [bikramgyawali.com.np](https://bikramgyawali.com.np)
- GitHub: [@BikramGyawali](https://github.com/BikramGyawali)

---

## 💬 Support & Contact

For support, email your-email@example.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Flowbite](https://flowbite.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)

---

## 📚 Useful Links

- [Project Repository](https://github.com/BikramGyawali/Job-Portal-Mern)
- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Flowbite React](https://flowbite-react.com)

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ by Bikram Gyawali

</div>
