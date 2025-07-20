# ⚛️ Abe's Garage Frontend

> The modern, responsive, and performant frontend for the Abe's Garage Management System. Built with Next.js, React, and Tailwind CSS, it provides a seamless user experience for both customers and employees.

---

## 🏗️ System Architecture

The frontend is built using Next.js and follows a feature-based folder structure, which helps to keep the code organized and maintainable.

- **`app/`**: The core of the application, using the Next.js App Router.
  - **`(admin)/`**: Contains all the pages and layouts for the admin dashboard. This is a route group, so it does not affect the URL.
    - **`(customer)`**, **`(employee)`**, **`(order)`**: Sub-groups for organizing related pages.
  - **`(auth)/`**: Contains the sign-in page.
  - **`(nav)/`**: Contains the main public-facing pages like "About", "Contact", and "Services".
  - **`api/`**: Contains the NextAuth.js route handler.
- **`components/`**: Contains all the reusable React components used throughout the application, organized by feature.
- **`features/`**: Contains the Redux Toolkit slices for state management and data fetching.
  - **`api/apiSlice.ts`**: The main RTK Query API slice, which defines all the endpoints for interacting with the backend.
  - **`auth/authSlice.ts`**: The Redux slice for managing authentication state.
- **`store/`**: Contains the Redux store configuration.
- **`types/`**: Contains all the TypeScript type definitions used in the application.

---

## ⚙️ Key Technologies

### Redux Toolkit & RTK Query

The application uses Redux Toolkit for efficient state management and RTK Query for data fetching and caching.

- **`apiSlice.ts`** defines all the API endpoints and their corresponding queries and mutations. It handles all the data fetching, caching, and invalidation logic automatically, which helps to keep the UI in sync with the backend.
- **`authSlice.ts`** manages the user's authentication state, including the JWT token and user information.

### NextAuth.js

NextAuth.js is used for authentication. It is configured with a credentials provider to handle email and password-based login. The session is managed using JWTs, and the `useSession` hook provides easy access to the user's session data throughout the application.

---

## 🛠️ Local Development & Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env.local` file** and add the following environment variables:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```
4.  **Start the frontend development server:**
    `bash
    npm run dev
    `
    The application will be running on `http://localhost:3000`.
