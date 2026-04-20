# Feature: Service Layer & Validation

## 🚀 Description
This feature introduces a service layer for business logic separation and Joi-based validation for incoming requests.

---

## 🧱 Service Layer

Business logic has been moved out of controllers into dedicated service functions.

### Benefits:
- Cleaner controllers
- Reusable logic
- Better separation of concerns
- Easier testing

### Example Flow:

Request → Controller → Service → Database

---

## ✅ Validation (Joi)

Joi is used to validate incoming data for:
- request body
- query parameters
- route params

Validation is handled via a reusable middleware.

---

## 🔧 Validation Middleware

- Centralized validation logic
- Automatically formats errors
- Strips unknown fields
- Applies default values

### Error format:

```json
{
  "success": false,
  "message": "Data is not valid",
  "errors": [
    { "field": "name", "message": "name is required" }
  ]
}