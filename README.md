# 🚗 Abe's Garage Management System

> A full-stack, production-grade vehicle repair and management system. Built with a modern Next.js/React frontend (Tailwind CSS, Redux Toolkit, Recharts), a robust Node.js/Express backend, and a PostgreSQL database. Designed for scalability, security, and a seamless user experience—showcasing best practices for enterprise-level business applications.

<p align="center">
  <a href="https://abe-garage-one.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Click_Here-28a745?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
</p>

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
  <img src="https://skillicons.dev/icons?i=nodejs,express,mysql,postgresql,jwt" height="32" alt="Backend stack"/>
</p>

- **Node.js** & **Express** (API Server)
- **MySQL** (Initial Development)
- **PostgreSQL** (Production Database)
- **JWT** (Authentication)

> **Note:** The project was initially developed with MySQL and has since been migrated to PostgreSQL for production to leverage its advanced features and scalability.

---

## 🚀 Deployment

<p align="left">
  <img src="https://skillicons.dev/icons?i=vercel,supabase" height="32" alt="Deployment platforms"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
</p>

This application is deployed across a modern, scalable infrastructure:

- **Frontend:** Hosted on **Vercel**, providing a seamless, high-performance experience with Next.js.
- **Backend:** The Node.js API is deployed on **Render**, ensuring a reliable and scalable server environment.
- **Database:** The PostgreSQL database is managed by **Supabase**, offering a robust and secure data layer.

---

## 🔒 Security

The backend is built with security in mind, incorporating several key features to protect against common vulnerabilities:

- **Helmet:** Sets various HTTP headers to secure the app from common attacks like cross-site scripting (XSS) and clickjacking.
- **CORS:** The Cross-Origin Resource Sharing policy is configured to only allow requests from the deployed frontend, preventing unauthorized access.
- **Rate Limiting:** Protects against brute-force attacks by limiting the number of requests from a single IP address.
- **Centralized Error Handling:** Ensures that all errors are handled gracefully and consistently, preventing information leaks.

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
- Create a `.env` file and add your PostgreSQL database credentials:
  ```
  DATABASE_URL=your_postgresql_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- Set up the database by running the initial schema located in `backend/db/initial-schema.sql`.
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
  NEXT_PUBLIC_API_URL=http://localhost:4000
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
