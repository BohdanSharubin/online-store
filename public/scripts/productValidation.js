import { validateField, showFieldError } from "./validation.js";

const BASE_URL = "";

const form = document.getElementById("createForm");

const productNameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const stockInput = document.getElementById("stock");

const submitButton = form.querySelector("button");

const messageElement = document.getElementById("message");

const errorsState = {};

const _showFieldError = (field, error) =>
  showFieldError(field, error, errorsState, updateSubmitButtonState);

const _validateField = (field, value) =>
  validateField(field, value);

function updateSubmitButtonState() {
  submitButton.disabled =
    Object.keys(errorsState).length > 0 ||
    !productNameInput.value.trim() ||
    !descriptionInput.value.trim() ||
    !priceInput.value.trim() ||
    !categoryInput.value.trim() ||
    !stockInput.value.trim();
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
  const fields = [
    {
      name: "productName",
      input: productNameInput,
    },
    {
      name: "description",
      input: descriptionInput,
    },
    {
      name: "price",
      input: priceInput,
    },
    {
      name: "category",
      input: categoryInput,
    },
    {
      name: "stock",
      input: stockInput,
    },
  ];

  fields.forEach(({ name, input }) => {
    _showFieldError(
      input.id,
      _validateField(name, input.value),
    );
  });

  return Object.keys(errorsState).length === 0;
}

productNameInput.addEventListener("blur", () => {
  _showFieldError(
    "name",
    _validateField("productName", productNameInput.value),
  );
});

descriptionInput.addEventListener("blur", () => {
  _showFieldError(
    "description",
    _validateField("description", descriptionInput.value),
  );
});

priceInput.addEventListener("blur", () => {
  _showFieldError(
    "price",
    _validateField("price", priceInput.value),
  );
});

categoryInput.addEventListener("blur", () => {
  _showFieldError(
    "category",
    _validateField("category", categoryInput.value),
  );
});

stockInput.addEventListener("blur", () => {
  _showFieldError(
    "stock",
    _validateField("stock", stockInput.value),
  );
});

[
  productNameInput,
  descriptionInput,
  priceInput,
  categoryInput,
  stockInput,
].forEach((input) => {
  input.addEventListener("input", () => {
    clearMessage();
    updateSubmitButtonState();
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearMessage();

  if (!validateAllFields()) return;

  const body = {
    name: productNameInput.value,
    description: descriptionInput.value,
    price: Number(priceInput.value),
    category: categoryInput.value,
    stock: Number(stockInput.value),
  };

  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors) {
      data.errors.forEach(({ field, error }) => {
        _showFieldError(field, error);
      });

      return;
    }

    showFormError(data.message || "Something went wrong");

    return;
  }

  showSuccessMessage("Product was added!");

  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1000);
});

updateSubmitButtonState();