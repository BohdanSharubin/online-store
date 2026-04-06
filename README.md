# Feature: Registration

## 🚀 Description
Implements user registration functionality with JWT authentication.

## 🔧 Features
- User schema
- Password hashing
- JWT token generation
- Protect middleware (JWT verification)
- Auth routes

## 📡 Routes

| Method | Route              | Description            | Auth |
|--------|--------------------|------------------------|------|
| POST   | /api/auth/register | Register new user      | ❌   |

## 🧠 Notes
- Password is hashed before saving
- JWT token is returned after registration
- User validation