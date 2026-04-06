# Online Store REST API

## 🚀 Description
Final version of the application combining:
- User registration
- Authentication (JWT)
- Error handling
- Product CRUD

## 🧱 Architecture

- Controllers — business logic
- Models — database schemas
- Routes — API endpoints
- Middleware:
  - protect (JWT auth)
  - restrictedTo (role-based access)
  - errorHandler (global error handling)
  - asyncHandler
- Utils:
  - money(converts money to cents and reverse for saving in MongoDB and giving to client)
- Errors:
  - AppError 
- server.js — main logic 
---

## 🛠 Technologies

- Node.js (v24)
- Express.js (v5.2.1)
- Mongoose (v9.4.1)
- Dotenv (v17.4.1)
- bcryptjs (v3.0.3)
- jsonwebtoken (v9.0.3)

## 🔐 Authentication

- JWT-based authentication
- Protected routes require token
- Role-based authorization

---

## 📡 Routes

### 🔑 Auth

| Method | Route              | Description           | Auth |
|--------|--------------------|-----------------------|------|
| POST   | /api/auth/register | Register user         | ❌   |
| POST   | /api/auth/login    | Login user            | ❌   |
| GET    | /api/auth/me       | Get current user      | ✅   |

---

### 📦 Products

| Method | Route               | Description           | Auth | Role           |
|--------|---------------------|-----------------------|------|----------------|
| GET    | /api/products       | Get all products      | ❌   | -              |
| GET    | /api/products/:id   | Get product by ID     | ❌   | -              |
| POST   | /api/products       | Create product        | ✅   | user           |
| PUT    | /api/products/:id   | Update product        | ✅   | admin          |
| DELETE | /api/products/:id   | Delete product        | ✅   | admin          |

---

## ⚠️ Notes

- Prices are stored in **cents**
- Centralized error handling is used
- Mongoose validation applied
- Middleware ensures security

---

## 🧠 Summary

This project demonstrates:
- Clean architecture
- Proper error handling
- Authentication & authorization
- RESTful API design
