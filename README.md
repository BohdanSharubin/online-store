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
- [Logging system](https://github.com/BohdanSharubin/online-store/tree/feature/logger)
---

## 🆕 Recent Updates

### 📝 Logging System (Winston & Morgan)
- Integrated **Winston** for centralized application logging.
- Integrated **Morgan** for HTTP request logging.
- Configured separate logging environments:
  - **Development**: Detailed colorized console logs.
  - **Production**: Structured file logging (errors and combined logs) for persistent monitoring.

### ⭐ Enhanced Review System & Frontend
- Added a new `Review` model with a complete architecture (Joi validation, Controller, Service, and Router).
- Fully integrated frontend views for interacting with reviews.
- Added dynamic client-side pages for viewing and submitting feedback.

### 🔧 Service Layer & Validation (Joi)
- Moved business logic from controllers to services for better testability and reuse.
- Added robust Joi validation middleware for request bodies, query parameters, and route components.

### 🌐 CORS & Routing Fixes
- Configured CORS middleware for seamless backend-frontend communication.
- Patched catch-all client routing to comply with the latest strict string parsers.

---

## 🧱 Architecture

- **Controllers** — handle HTTP requests & responses.
- **Services** — encapsulate core business logic.
- **Models** — define database schemas (Mongoose).
- **Routes** — API endpoints mapping.
- **Middleware**:
  - `protect` (JWT auth validation)
  - `restrictedTo` (role-based access control)
  - `errorHandler` (global centralized error handling)
  - `asyncHandler` (unhandled promise wrapper)
  - `validate` (Joi schema validation runner)
- **Validators**:
  - `authValidation`, `productValidation`, `reviewValidation` (Joi schemas)
- **Config & Logging**:
  - `winston` logger configuration.
- **Utils**:
  - `money` (handles precision by converting to/from cents).
- **Errors**:
  - `AppError` (custom operational error class).
- `server.js` — main application entry point.

---

## 🛠 Technologies

- Node.js (v24)
- Express.js (v5.2.1)
- Mongoose (v9.4.1)
- Dotenv (v17.4.1)
- bcryptjs (v3.0.3)
- jsonwebtoken (v9.0.3)
- Joi (v18.1.2)
- Winston (v3.17.0)
- Morgan (v1.10.0)
- cors
- cookie-parser

---

## 🔐 Authentication

- JWT-based authentication via HTTP-Only cookies or headers.
- Protected routes require a valid token.
- Role-based authorization (`user`, `admin`).

---

## 📡 Routes & Client Pages

### 🔑 Auth Endpoints

| Method | Route              | Description           | Auth |
|--------|--------------------|-----------------------|------|
| POST   | /api/auth/register | Register user         | ❌    |
| POST   | /api/auth/login    | Login user            | ❌    |
| GET    | /api/auth/me       | Get current user      | ✅    |

### 📦 Products Endpoints

| Method | Route               | Description              | Auth | Role   |
|--------|---------------------|--------------------------|------|--------|
| GET    | /api/products       | Get all products         | ❌    | -      |
| GET    | /api/products/:id   | Get product by ID        | ❌    | -      |
| POST   | /api/products       | Create product           | ✅    | user   |
| PUT    | /api/products/:id   | Update product           | ✅    | admin  |
| DELETE | /api/products/:id   | Delete product           | ✅    | admin  |

#### 🔍 Query Parameters for Products
- `page`: Page number (default: `1`)
- `limit`: Items per page (default: `10`)
- `category`: Filter by category name

*Example:* `GET /api/products?page=1&limit=5&category=Electronics`

### ⭐ Reviews Endpoints

| Method | Route                                | Description                                      | Auth |
|--------|--------------------------------------|--------------------------------------------------|------|
| GET    | /api/products/:productId/reviews     | Get all reviews for a specific product            | ❌    |
| POST   | /api/products/:productId/reviews     | Create a new review for a product                 | ✅    |
| DELETE | /api/products/:productId/reviews/:id | Delete a specific review by its ID               | ✅    |

### 🖥 Client Pages (Served from `/public`)

Frontend logic communicates with backend APIs using a configurable `BASE_URL` (e.g., `http://localhost:3000`).

| Page                 | Description                                                 |
|----------------------|-------------------------------------------------------------|
| `/login.html`        | User login page                                             |
| `/register.html`     | User registration page                                      |
| `/index.html`     | Product list page (with sorting and pagination)             |
| `/add-product.html`  | Create product page (Admin authorized)                     |
| `/reviews.html` | Lists all customer reviews for a given product           |
| `/add-review.html`   | Form page to submit a new review and rating for a product   |

---

## ⚠️ Technical Notes

- **Environment Config**: Server setup uses `dotenv` to separate development and production states.
- **Logging Strategy**: Console logs are silenced in production; instead, logs write directly to `.log` files via Winston.
- **Currency Handling**: Prices are consistently processed in **cents** to eliminate floating-point math issues.
- **Data Integrity**: Request validations occur at the gateway layer (Joi) before ever hitting Mongoose schema validations.

---

## 🧠 Summary

This project demonstrates a production-ready setup including:
- Clean architecture (**Controller → Service → Data Access Layer**).
- RESTful API best practices.
- Multi-environment **Winston & Morgan logging**.
- Seamless Request-Response schema validations.
- Static frontend integration with dynamic cross-origin API binding.