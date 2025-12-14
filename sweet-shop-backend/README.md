# Sweet Shop Management System

A production-ready full-stack application demonstrating **Test-Driven Development (TDD)**, **JWT Authentication**, **Role-Based Access Control**, and modern web development practices.

## 🎯 Project Overview

This system allows users to browse, search, and purchase sweets, while administrators can manage inventory through a secure REST API built with Spring Boot and a responsive React frontend.

### Key Features

**Backend (Spring Boot + MySQL)**
- JWT-based authentication and authorization
- Role-based access control (USER, ADMIN)
- RESTful API design principles
- MySQL database integration
- Comprehensive test coverage with JUnit 5 and Mockito
- Transaction management for inventory operations

**Frontend (React)**
- Modern, responsive user interface
- JWT token management
- Protected routes
- Real-time inventory updates
- Search and filter functionality
- Admin dashboard for inventory management

## 🛠️ Technologies Used

### Backend
- Java 21
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT (io.jsonwebtoken)
- JUnit 5 & Mockito
- JaCoCo (test coverage)
- Maven

### Frontend
- React 18
-React Router
- Axios
- Modern CSS

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Java JDK 21** or higher
- **MySQL 8.0** or higher
- **Node.js 18+** and npm
- **Git**

## 🚀 Local Setup Instructions

### Database Setup

1. **Start MySQL Server**
   ```bash
   # Windows (if not already running)
   net start MySQL80
   ```

2. **Create Database** (Optional - auto-created on first run)
   ```sql
   CREATE DATABASE sweetshop_db;
   ```

3. **Configure Database Credentials**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/sweetshop_db?createDatabaseIfNotExist=true
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd sweet-shop-backend
   ```

2. **Build the Project**
   ```bash
   ./mvnw clean install
   ```

3. **Run Tests**
   ```bash
   ./mvnw test
   ```

4. **Generate Test Coverage Report**
   ```bash
   ./mvnw jacoco:report
   # View report at: target/site/jacoco/index.html
   ```

5. **Run the Application**
   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will start on **http://localhost:8080**

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd sweet-shop-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API Endpoint** (if needed)
   
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

   The frontend will open at **http://localhost:3000**

## 📚 API Documentation

### Authentication Endpoints (Public)

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "USER",
  "message": "User registered successfully"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### Sweets Endpoints (Protected)

> **Note:** All endpoints below require `Authorization: Bearer <JWT_TOKEN>` header except GET /api/sweets and /api/sweets/search

#### Get All Sweets
```http
GET /api/sweets
```

#### Get Sweet by ID
```http
GET /api/sweets/{id}
```

#### Search Sweets
```http
GET /api/sweets/search?name=chocolate&category=candy&minPrice=10&maxPrice=50
```

#### Add New Sweet
```http
POST /api/sweets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantityInStock": 100
}
```

#### Update Sweet
```http
PUT /api/sweets/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dark Chocolate Bar",
  "category": "Chocolate",
  "price": 3.49,
  "quantityInStock": 75
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/{id}
Authorization: Bearer <admin-token>
```

### Inventory Endpoints

#### Purchase Sweet
```http
POST /api/sweets/{id}/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/{id}/restock
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "quantity": 50
}
```

## 🧪 Testing

### Running Backend Tests

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserRepositoryTest

# Run with coverage report
./mvnw clean test jacoco:report
```

### Test Coverage

The project maintains **>80% test coverage** including:
- Unit tests for repositories
- Service layer tests with mocked dependencies
- Controller tests with MockMvc
- Integration tests
- Security tests

View coverage report: `target/site/jacoco/index.html`

## 📸 Screenshots

### User Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### Login Page
![Login Screenshot](./screenshots/login.png)

### Admin Panel
![Admin Panel Screenshot](./screenshots/admin-panel.png)

### Purchase Flow
![Purchase Flow Screenshot](./screenshots/purchase.png)

## 🤖 My AI Usage

### AI Tools Used
- **Google Gemini** (AI Assistant in IDE)
- **Purpose:** Code generation, test writing, debugging assistance

### How AI Was Used

1. **Initial Project Structure (30% AI-generated)**
   - Generated boilerplate entity classes
   - Created initial repository interfaces
   - Suggested Spring Security configuration patterns

2. **Test Writing (40% AI-assisted)**
   - Generated test method templates following TDD principles
   - Suggested edge cases for validation testing
   - Helped structure MockMvc integration tests

3. **DTO and Request/Response Objects (60% AI-generated)**
   - Auto-generated getter/setter boilerplate
   - Created validation annotations based on requirements

4. **Documentation (50% AI-assisted)**
   - Generated API documentation templates
   - Formatted README structure
   - Created code comments

### Manual Review and Modifications

All AI-generated code was:
- **Manually reviewed** for correctness and security
- **Refactored** to follow clean code principles
- **Extended** with custom business logic
- **Integrated** with manual implementations
- **Tested** thoroughly before committing

### Impact Reflection

**Positive Impacts:**
- ⚡ **Faster development** - Reduced boilerplate writing time by ~40%
- 🧪 **Better test coverage** - AI suggestions helped identify edge cases
- 📚 **Improved documentation** - Consistent API documentation format

**Challenges:**
- 🔍 **Verification overhead** - All AI code required careful review
- 🎯 **Generic solutions** - AI sometimes provided overly generic code needing customization
- 🔐 **Security awareness** - Manual review essential for security-critical components (JWT, authentication)

**Learning:**
AI is a powerful accelerator but not a replacement for understanding. The best results came from using AI for boilerplate and documentation while manually implementing critical business logic.

## 📝 Git Commit History

This project follows a detailed commit strategy with AI attribution:

```bash
[TDD] Add User entity tests - Red phase
[TDD] Implement User entity and repository - Green phase
[Auth] Implement JWT utilities

Co-authored-by: AI Assistant <ai@google.com>
```

View complete history: `git log --all --graph --decorate`

## 🏗️ Project Structure

```
sweet-shop-backend/
├── src/main/java/com/sweetshop/
│   ├── config/              # Security, CORS configuration
│   ├── controller/          # REST API controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── entity/              # JPA entities
│   ├── repository/          # Data access layer
│   ├── security/            # JWT utilities, filters
│   └── service/             # Business logic
├── src/test/java/           # Unit & integration tests
└── src/main/resources/
    └── application.properties

sweet-shop-frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── App.jsx
└── package.json
```

## 🔒 Security Features

- **BCrypt password hashing** - Passwords never stored in plain text
- **JWT tokens** with 24-hour expiration
- **Role-based authorization** - ADMIN vs USER permissions
- **CORS configuration** - Controlled cross-origin access
- **Stateless sessions** - Scalable authentication
- **SQL injection prevention** - JPA parameterized queries

## 🚦 Development Methodology

This project strictly follows **Test-Driven Development (TDD)**:

1. **RED** - Write failing test
2. **GREEN** - Implement minimum code to pass
3. **REFACTOR** - Clean up and optimize

Every feature was developed using RED-GREEN-REFACTOR cycles, ensuring robust, tested code.

## 👥 Contributors

- **Your Name** - Developer
- **AI Assistant (Google Gemini)** - Code generation support

## 📄 License

This project is developed for educational purposes.

## 🤝 Acknowledgments

- Spring Boot team for excellent framework
- JWT library maintainers
- React community
- Google Gemini for AI assistance

---

**Note:** This is an original implementation developed for demonstrating modern full-stack development practices with TDD methodology and responsible AI usage.
