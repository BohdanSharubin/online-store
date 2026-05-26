import { validateField, showFieldError } from "./validation.js";

const BASE_URL = "";
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = form.querySelector("button");
const errorsState = {};

const _showFieldError = (field, error) =>
  showFieldError(field, error, errorsState, updateSubmitButtonState);

function clearFormErrors() {
  const formError = document.getElementById("loginForm-error");
  formError.textContent = "";
  formError.classList.add("hidden");
  delete errorsState["loginForm"];
}

function updateSubmitButtonState() {
  submitButton.disabled =
    Object.keys(errorsState).length > 0 ||
    !emailInput.value.trim() ||
    !passwordInput.value.trim();
}

emailInput.addEventListener("blur", () => {
  clearFormErrors();
  _showFieldError("email", validateField("email", emailInput.value));
});
passwordInput.addEventListener("blur", () => {
  clearFormErrors();
  _showFieldError("password", validateField("password", passwordInput.value));
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", updateSubmitButtonState);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFormErrors();

  ["email", "password"].forEach((name) => {
    const input = document.getElementById(name);
    _showFieldError(name, validateField(name, input.value));
  });
  if (Object.keys(errorsState).length > 0) return;

  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.errors) {
      data.errors.forEach(({ field, error }) => _showFieldError(field, error));
      return;
    }
    if (data.message) {
      _showFieldError("loginForm", data.message);
      return;
    }
  }

  window.location.href = "/index.html";
});

updateSubmitButtonState();
