<p align="center" style="background:#f3f4f6;padding:20px 0;border-radius:12px;">
  <img src="https://i.ibb.co/L1N7Hh4/logo.png" alt="Abe's Garage Logo" width="200"/>
</p>

# 🚗 Abe's Garage Management System

> A full-stack, production-grade vehicle repair and management system. Built with a modern Next.js/React frontend (Tailwind CSS, Redux Toolkit, Recharts), a robust Node.js/Express backend, and a MySQL database. Designed for scalability, security, and a seamless user experience—showcasing best practices for enterprise-level business applications.

---

## ✨ Features

- 🔐 **Secure Authentication:** Role-based access control with JWT for employees and admins.
- 📊 **Modern Admin Dashboard:** At-a-glance KPIs for total customers, active orders, and revenue, with visually rich charts for order trends and revenue breakdown.
- 🧑‍💼 **Employee Management:** Full CRUD operations for adding, viewing, and deleting employees.
- 👤 **Customer Management:** Full CRUD operations for adding, viewing, searching, and updating customer information.
- 📝 **Order Management:** A multi-step order creation process, from customer and vehicle selection to service and pricing details. View, update, and track order statuses (Pending, In-Progress, Completed, Cancelled).
- 🛠️ **Service Management:** Full CRUD operations for managing the services offered by the garage.
- 📱 **Responsive Design:** A clean, modern, and mobile-first UI that works on all devices.
- ⚡ **Optimized for Performance:** Built with Next.js for fast page loads and a smooth user experience.

---

## 🖥️ Tech Stack

### Frontend

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,redux" height="32" alt="Frontend stack"/>
  <img src="https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts"/>
</p>

- **Next.js** (React Framework)
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** & **RTK Query** (State Management & Data Fetching)
- **Recharts** (Charting Library)
- **NextAuth.js** (Authentication)

### Backend

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mysql,jwt" height="32" alt="Backend stack"/>
</p>

- **Node.js** & **Express** (API Server)
- **MySQL** (Relational Database)
- **JWT** (Authentication)

---

## 🛠️ Local Development & Setup

### 1. Clone the repo

```bash
git clone https://github.com/Tesfamichael12/Abe-Garage.git
cd Abe-Garage
```

### 2. Backend Setup

- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file and add your MySQL database credentials:
  ```
  DB_HOST=your_db_host
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_DATABASE=your_db_name
  JWT_SECRET=your_jwt_secret
  ```
- Set up the database by running the initial queries located in `backend/services/sql/initial-queries.sql`.
- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup

- In a new terminal, navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env.local` file and add the API URL:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8000
  NEXTAUTH_SECRET=your_nextauth_secret
  NEXTAUTH_URL=http://localhost:3000
  ```
- Start the frontend development server:
  ```bash
  npm run dev
  ```

---

## 🙌 Credits

- Built by [Tesfamichael Tafere](https://github.com/Tesfamichael12)

