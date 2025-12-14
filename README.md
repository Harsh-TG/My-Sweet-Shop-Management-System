# My Sweet Shop Management System

A full-stack inventory and billing application for sweet shops, built using Test-Driven Development (TDD) principles with a modern backend and responsive frontend.

## 📁 Project Structure

```
quickStart/
├── smartsweet-backend/       # Spring Boot REST API + MySQL
│   ├── src/
│   ├── pom.xml
│   ├── README.md            # Backend setup & API details
│   └── PROJECT_OVERVIEW.md  # Design & implementation notes
│
└── smartsweet-frontend/     # React-based Web Interface
    ├── src/
    ├── package.json
    └── (refer backend README for environment setup)

```

## Getting Started
Backend Setup
cd smartsweet-backend
.\mvnw.cmd spring-boot:run


## Backend service will start at:
👉 http://localhost:8080

Frontend Setup
cd smartsweet-frontend
npm start


## Frontend application runs at:
👉 http://localhost:3000


## Documentation

Backend documentation: smartsweet-backend/README.md

System design & implementation: smartsweet-backend/PROJECT_OVERVIEW.md

## Core Features

✔ Secure JWT-based Authentication
✔ Role-based Authorization (ADMIN / USER)
✔ Complete Sweet Inventory CRUD APIs
✔ Stock & Inventory Management
✔ Search and Filter Functionality
✔ Responsive React UI
✔ MySQL Database Integration
✔ Test-Driven Development (TDD) Workflow

## Tech Stack: 

    Frontend
    React
    JavaScript
    CSS (Custom UI theming)

    Backend
    Java
    Spring Boot
    Spring Security (JWT)
    MySQL

    Tools
    Git & GitHub
    Maven
    VS Code / IntelliJ IDEA

## Setup Checklist

Update database credentials in
smartsweet-backend/src/main/resources/application.properties

Start the backend service

Launch the frontend application

Open http://localhost:3000
 in your browser

Register a new account or log in

👤 Author

Harsh Tyagi
B.Tech – Computer Science & Design

📌 This project demonstrates practical full-stack development skills, secure authentication, and clean UI design (JSR)
