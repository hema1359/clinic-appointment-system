# ClinicCare — Appointment Booking System

A full-stack clinic appointment management system that lets patients book appointments with doctors, doctors manage their schedules, and admins oversee the platform.

## Features

- **Patient**: Register/login, browse doctors, book appointments, view appointment history
- **Doctor**: View and manage assigned appointments via a dedicated dashboard
- **Admin**: Manage doctors, users, and platform-wide data via an admin dashboard
- **Authentication**: Secure JWT-based login and role-based access control

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS

**Backend**
- Spring Boot (Java)
- Spring Security with JWT authentication
- Spring Data JPA (Hibernate)

**Database**
- MySQL

## Project Structure

```
Appointments Booking System/
├── frontend/          # React + TypeScript client
│   └── src/
│       ├── components/  # Header, Footer, PrivateRoute
│       ├── context/     # Auth context
│       ├── pages/        # Login, Register, DoctorsList, BookAppointment, dashboards, etc.
│       └── services/     # API service layer
├── backend/           # Spring Boot server
│   └── src/main/java/com/clinic/
│       ├── config/       # Security, CORS, JWT config
│       ├── controller/   # Auth, Doctor, Patient, Admin controllers
│       ├── dto/          # Data transfer objects
│       ├── model/        # Appointment, Doctor, TimeSlot, User entities
│       └── repository/   # JPA repositories
└── db/                # SQL schema and seed data
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17+
- Maven
- MySQL

### 1. Database Setup
Create a MySQL database and run the provided SQL scripts:
```bash
mysql -u root -p < db/schema.sql
mysql -u root -p < db/seed.sql
```

### 2. Backend Setup
```bash
cd backend
```
Copy the example config and fill in your own database credentials:
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```
Edit `application.properties` with your local MySQL username/password, then run:
```bash
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Environment Variables / Config

The backend requires a local `application.properties` file (not committed to this repo for security). See `application.properties.example` for the required fields.

## License

This project is currently unlicensed. All rights reserved unless stated otherwise.
