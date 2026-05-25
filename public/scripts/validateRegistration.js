import { validateField, showFieldError } from "./validation.js";

const BASE_URL = "http://localhost:3000";
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitButton = form.querySelector("button");
const messageElement = document.getElementById("message");
const errorsState = {};

const _showFieldError = (field, error) =>
  showFieldError(field, error, errorsState, updateSubmitButtonState);

const _validateField = (field, value) =>
  validateField(field, value, passwordInput);

function updateSubmitButtonState() {
  submitButton.disabled =
    Object.keys(errorsState).length > 0 ||
    !nameInput.value.trim() ||
    !emailInput.value.trim() ||
    !passwordInput.value.trim() ||
    !confirmPasswordInput.value.trim();
}

function showFormError(message) {
  messageElement.textContent = message;
  messageElement.classList.add("error");
}

function showSuccessMessage(message) {
  messageElement.textContent = message;
  messageElement.classList.remove("error");
  messageElement.classList.add("success");
}

function clearMessage() {
  messageElement.textContent = "";
  messageElement.classList.remove("error", "success");
}

function validateAllFields() {
  ["name", "email", "password", "confirmPassword"].forEach((name) => {
    const input = document.getElementById(name);
    _showFieldError(name, _validateField(name, input.value));
  });
  return Object.keys(errorsState).length === 0;
}

nameInput.addEventListener("blur", () =>
  _showFieldError("name", _validateField("name", nameInput.value)),
);
emailInput.addEventListener("blur", () =>
  _showFieldError("email", _validateField("email", emailInput.value)),
);
passwordInput.addEventListener("blur", () => {
  _showFieldError("password", _validateField("password", passwordInput.value));
  if (confirmPasswordInput.value) {
    _showFieldError(
      "confirmPassword",
      _validateField("confirmPassword", confirmPasswordInput.value),
    );
  }
});
confirmPasswordInput.addEventListener("blur", () =>
  _showFieldError(
    "confirmPassword",
    _validateField("confirmPassword", confirmPasswordInput.value),
  ),
);

[nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
  (input) => {
    input.addEventListener("input", () => {
      clearMessage();
      updateSubmitButtonState();
    });
  },
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();
  if (!validateAllFields()) return;

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      data.errors.forEach(({ field, error }) => _showFieldError(field, error));
      return;
    }
    showFormError(data.message || "Something went wrong");
    return;
  }

  showSuccessMessage("Registration successful!");
  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1000);
});

updateSubmitButtonState();
