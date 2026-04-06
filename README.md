# Feature: Error Handling

## 🚀 Description
Centralized error handling system for the application. Used asyncHandler for wrapped controllers.

## 🔧 Features
- asyncHandler wrapper for async functions
- Global errorHandler middleware
- Custom AppError class

## 🧠 Example

```js
throw AppError.notFound("Product not found");
📌 Benefits
Eliminates repetitive try-catch blocks
Standardized error responses
Cleaner controller code
