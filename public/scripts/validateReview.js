import { validateField, showFieldError } from "./validation.js";

const BASE_URL = "";
const form = document.getElementById("reviewForm");
const commentInput = document.getElementById("comment");
const submitButton = form.querySelector("button");
const messageElement = document.getElementById("message");
const errorsState = {};

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const _showFieldError = (field, error) =>
  showFieldError(field, error, errorsState, updateSubmitButtonState);

const _validateField = (field, value) => validateField(field, value);

function getSelectedRating() {
  const checked = document.querySelector('input[name="rating"]:checked');
  return checked ? Number(checked.value) : null;
}

function updateSubmitButtonState() {
  submitButton.disabled =
    Object.keys(errorsState).length > 0 ||
    getSelectedRating() === null ||
    !commentInput.value.trim();
}

function showFormError(message) {
  messageElement.textContent = message;
  messageElement.classList.add("error");
  messageElement.classList.remove("success");
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
  _showFieldError("rating", _validateField("rating", getSelectedRating()));
  _showFieldError("comment", _validateField("comment", commentInput.value));
  return Object.keys(errorsState).length === 0;
}

document.querySelectorAll('input[name="rating"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    clearMessage();
    _showFieldError("rating", _validateField("rating", getSelectedRating()));
  });
});

commentInput.addEventListener("blur", () =>
  _showFieldError("comment", _validateField("comment", commentInput.value)),
);

commentInput.addEventListener("input", () => {
  clearMessage();
  updateSubmitButtonState();

  const len = commentInput.value.length;
  document.getElementById("charCount").textContent = len;
  document
    .getElementById("charCount")
    .parentElement.classList.toggle("over", len > 500);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();
  if (!validateAllFields()) return;

  const response = await fetch(
    `${BASE_URL}/api/products/${productId}/reviews`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: getSelectedRating(),
        comment: commentInput.value.trim(),
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.errors) {
      data.errors.forEach(({ field, error }) => _showFieldError(field, error));
      return;
    }
    showFormError(data.message || "Something went wrong");
    return;
  }

  showSuccessMessage("Review submitted!");
  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1200);
});

if (productId) {
  fetch(`${BASE_URL}/api/products/${productId}`)
    .then((r) => r.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("product-name").textContent = data.data.name;
      }
    })
    .catch(() => {
      document.getElementById("product-name").textContent = "Product not found";
    });
} else {
  document.getElementById("product-name").textContent = "No product specified.";
}

updateSubmitButtonState();