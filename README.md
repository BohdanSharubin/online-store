# Feature: Product CRUD

## 🚀 Description
Implements full CRUD functionality for Product model.

## 🔧 Features
- Product controller
- Product routes
- Role-based access control (restrictedTo)

## 📡 Routes

| Method | Route               | Description         | Auth | Role           |
|--------|---------------------|---------------------|------|----------------|
| GET    | /api/products       | Get all products    | ❌   | -              |
| GET    | /api/products/:id   | Get product by ID   | ❌   | -              |
| POST   | /api/products       | Create product      | ✅   | user           |
| PUT  | /api/products/:id   | Update product      | ✅   | admin         |
| DELETE | /api/products/:id   | Delete product      | ✅   | admin         |

## 🧠 Notes
- Only authorized users can modify data
- Role-based checks applied via middleware