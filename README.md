# Online Store REST API

## 🚀 Description
Final version of the application combining:
- [User registration](https://github.com/BohdanSharubin/online-store/tree/feature/registration)
- [Authentication (JWT)](https://github.com/BohdanSharubin/online-store/tree/feature/auth)
- [Error handling](https://github.com/BohdanSharubin/online-store/tree/feature/error-handling)
- [Product CRUD](https://github.com/BohdanSharubin/online-store/tree/feature/crud)
- [Service layer and Request validation](https://github.com/BohdanSharubin/online-store/tree/feature/services)
- [Client-side pages](https://github.com/BohdanSharubin/online-store/tree/feature/client-side)
- [CORS support](https://github.com/BohdanSharubin/online-store/tree/feature/cors)
- [Review system](https://github.com/BohdanSharubin/online-store/tree/feature/model-reviews)

---

## 🆕 Recent Updates

### 🔧 Service Layer
- Moved business logic from controllers to services
- Improved code structure and readability
- Enabled easier testing and reuse of logic

### ✅ Validation (Joi)
- Added Joi validation for:
  - request body
  - query parameters
  - route params
  - Product model
  - authorization and registration
- Introduced reusable validation middleware
- Implemented structured error responses

### 🌐 CORS Support
- Added CORS middleware
- Enabled cross-origin requests between frontend and backend

### 🖥 Client Pages
Added static client pages using `express.static()`:

- Login page
- Registration page
- Add product page
- Product list page

### ⭐ Review System
Added a new `Review` model with:
- Joi validation schema
- Controller layer
- Service layer
- Router

Reviews support:
- Creating reviews
- Fetching reviews
- Product-user relation handling

### 📡 Query Features
- Pagination (`page`, `limit`)
- Filtering by category

---

## 🧱 Architecture

- Controllers — handle request/response
- Services — business logic
- Models — database schemas
- Routes — API endpoints
- Middleware:
  - protect (JWT auth)
  - restrictedTo (role-based access)
  - errorHandler (global error handling)
  - asyncHandler
  - validate (Joi validation)
- Validators:
  - authValidation (Joi schema for authentication)
  - productValidation (Joi schema for product)
  - reviewValidation
- Utils:
  - money (convert to/from cents)
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
- Joi (v18.1.2)
- cors
- cookie-parser

---

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

| Method | Route               | Description              | Auth | Role   |
|--------|---------------------|--------------------------|------|--------|
| GET    | /api/products       | Get all products         | ❌   | -      |
| GET    | /api/products/:id   | Get product by ID        | ❌   | -      |
| POST   | /api/products       | Create product           | ✅   | user   |
| PUT    | /api/products/:id   | Update product           | ✅   | admin  |
| DELETE | /api/products/:id   | Delete product           | ✅   | admin  |

#### 🔍 Query Parameters

| Param     | Description              |
|-----------|--------------------------|
| page      | Page number (default: 1) |
| limit     | Items per page (default: 10) |
| category  | Filter by category       |

Example:
`
GET /api/products?page=1&limit=5&category=Electronics 
`

### ⭐ Reviews
| Method | Route            | Description      | Auth |
| ------ | ---------------- | ---------------- | ---- |
| GET    | /api/products/:productId/reviews     | Get all reviews for a product with productId  | ❌    |
| POST   | /api/products/:productId/reviews     | Create review for a product with productId   | ✅    |
| DELETE | /api/products/:productId/reviews/:id | Delete review with id on product with productId    | ✅    |


### 🖥Client Pages
| Page              | Description            |
| ----------------- | ---------------------- |
| /login.html       | User login page        |
| /register.html    | User registration page |
| /products.html    | Product list page      |
| /add-product.html | Create product page    |

---

## ⚠️ Notes

- Prices are stored in **cents**
- Centralized error handling is used
- Joi ensures request validation
- Mongoose handles schema validation
- Middleware ensures security and data integrity
- Static frontend pages are served from /public
---

## 🧠 Summary

This project demonstrates:
- Clean architecture (Controller → Service → DB)
- RESTful API design
- Authentication & authorization
- Request validation
- Error handling
- Service layer architecture
- Static frontend integration
- Cross-origin communication
- Review management system