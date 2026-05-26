export function validateField(field, value, passwordInput = null) {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
      return "";

    case "password":
      if (!value.trim()) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";

    case "confirmPassword":
      if (!value.trim()) return "Confirm your password";
      if (passwordInput && value !== passwordInput.value)
        return "Passwords do not match";
      return "";

    case "rating":
      if (value === null || value === undefined || value === "")
        return "Please select a rating";
      if (!Number.isInteger(Number(value)) || value < 1 || value > 5)
        return "Rating must be between 1 and 5";
      return "";

    case "comment":
      if (!value.trim()) return "Comment is required";
      if (value.trim().length < 10)
        return "Comment must be at least 10 characters";
      if (value.trim().length > 500)
        return "Comment must be no more than 500 characters";
      return "";

    default:
      return "";
  }
}

export function showFieldError(
  field,
  error,
  errorsState,
  updateSubmitButtonState,
) {
  const errorElement = document.getElementById(`${field}-error`);
  const inputElement = document.getElementById(field);

  errorElement.textContent = error;

  if (error) {
    errorElement.classList.add("error");
    errorElement.classList.remove("hidden");
    if (inputElement) {
      inputElement.classList.add("invalid");
      inputElement.classList.remove("valid");
    }
    errorsState[field] = error;
  } else {
    errorElement.classList.remove("error");
    errorElement.classList.add("hidden");
    if (inputElement) {
      inputElement.classList.remove("invalid");
      inputElement.classList.add("valid");
    }
    delete errorsState[field];
  }

  updateSubmitButtonState();
}