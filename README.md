# Feature: Authentication

## 🚀 Description
Adds login functionality and ability to get current authenticated user.

## 🔧 Features
- Login with email and password
- JWT authentication
- Get current user (getMe)

## 📡 Routes

| Method | Route           | Description             | Auth |
|--------|-----------------|-------------------------|------|
| POST   | /api/auth/login | Login user              | ❌   |
| GET    | /api/auth/me    | Get current user        | ✅   |

## 🧠 Notes
- Password is validated before login
- JWT must be provided in headers for protected routes