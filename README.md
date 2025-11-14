# VIRAL 33 Rent Cars - Backend API

This directory contains the backend API for the VIRAL 33 application, built with [NestJS](https://nestjs.com/).

## Features

- **Authentication**: JWT-based authentication for admin users.
- **CRUD Operations**: Full management for Vehicles, Clients, Reservations, and Expenses.
- **File Uploads**: Image uploads for vehicles.
- **PDF Generation**: Automatic contract generation for reservations.
- **Dashboard Analytics**: An endpoint to provide key statistics for the admin dashboard.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running **MySQL** server instance.

## 🚀 Installation and Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Database Setup:**
    Ensure your MySQL server is running. Create a database (e.g., `viral33_dev`) and then run the SQL scripts provided to you to create the necessary tables and insert initial data.

4.  **Environment Variables:**
    Create a `.env` file in the root of the `backend` directory. You can copy the example below.
    
    ```env
    # .env file

    # JWT Configuration
    JWT_SECRET=your_super_secret_key_for_jwt
    JWT_EXPIRATION_TIME=3600s

    # Database Configuration
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=viral33_dev
    ```
    
    Replace the placeholder values with your actual database credentials.

5.  **Run the application (development mode):**
    ```bash
    npm run start:dev
    ```
    The server will start on `http://localhost:3000`. It will automatically restart when you make changes to the code.

## API Documentation (Swagger)

This API includes interactive documentation using Swagger UI. Once the server is running, you can access it at:

[**http://localhost:3000/api**](http://localhost:3000/api)

The documentation provides detailed information about each endpoint, including parameters, request bodies, and response schemas. You can also test the endpoints directly from the UI.

For protected endpoints, click the "Authorize" button and enter your JWT token in the format `Bearer <token>` to authenticate your requests.

## API Endpoints

The API is structured modularly. Most administrative endpoints are protected and require a JWT token in the `Authorization` header (`Bearer <token>`).

- **Auth**: `POST /auth/login`, `POST /auth/register`
- **Vehicles**: `GET, POST, PATCH, DELETE /vehicles`
- **Clients**: `GET, POST, PATCH, DELETE /clients`
- **Reservations**: `GET, POST, PATCH, DELETE /reservations`
- **Contracts**: `GET /contracts/reservation/:id` (returns a PDF)
- **Dashboard**: `GET /dashboard/stats`

## Database

This project uses **MySQL**. The application connects to the database using the credentials specified in the `.env` file.

**Important**: The schema is **not** managed automatically by TypeORM (`synchronize` is set to `false`). All schema changes must be applied manually to the database, for instance, through SQL scripts.