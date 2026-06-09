import { escapeHTML } from "./validation.js";

const BASE_URL = "";
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

function stars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating ? `<span>★</span>` : `<span class="empty">★</span>`,
  ).join("");
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

async function fetchCurrentUser() {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.user : null;
  } catch {
    return null;
  }
}

async function init() {
  if (!productId) {
    document.getElementById("product-name").textContent =
      "No product specified.";
    return;
  }

  const [productRes, user] = await Promise.all([
    fetch(`${BASE_URL}/api/products/${productId}`).then((r) => r.json()),
    fetchCurrentUser(),
  ]);

  if (productRes.success) {
    document.getElementById("product-name").textContent = productRes.data.name;
  }

  if (user) {
    const btn = document.getElementById("addReviewBtn");
    btn.addEventListener("click", () => {
      window.location.href = `/add-review?productId=${productId}`;
    });
    btn.style.display = "inline-flex";
  }

  const reviewsRes = await fetch(
    `${BASE_URL}/api/products/${productId}/reviews`,
  );
  const reviewsData = await reviewsRes.json();
  const reviews = reviewsData.data || [];

  const countEl = document.getElementById("reviews-count");
  countEl.textContent =
    reviews.length === 0
      ? "No reviews yet"
      : `${reviews.length} review${reviews.length > 1 ? "s" : ""}`;

  const list = document.getElementById("reviewList");

  if (reviews.length === 0) {
    list.innerHTML = `
            <li class="empty-state">
              No reviews yet. Be the first to leave one!
            </li>`;
    return;
  }

  list.innerHTML = reviews
    .map(
      (r) => `
            <li class="review-card">
              <div class="review-top">
                <span class="review-author">${r.user?.name ?? "Anonymous"}</span>
                <div class="review-stars">${stars(r.rating)}</div>
              </div>
              <span class="review-date">${formatDate(r.createdAt)}</span>
              <p class="review-comment collapsed">${escapeHTML(r.comment)}</p>
              <button class="toggle-review-btn">Read more</button>
            </li>`,
    )
    .join("");
  const reviewCards = list.querySelectorAll(".review-card");

  reviewCards.forEach((card) => {
    const textElement = card.querySelector(".review-comment");
    const toggleBtn = card.querySelector(".toggle-review-btn");

    if (textElement.scrollHeight > textElement.clientHeight) {
      toggleBtn.style.display = "inline-block";
    }

    toggleBtn.addEventListener("click", () => {
      const isCollapsed = textElement.classList.contains("collapsed");

      if (isCollapsed) {
        textElement.classList.remove("collapsed");
        toggleBtn.textContent = "Show less";
      } else {
        textElement.classList.add("collapsed");
        toggleBtn.textContent = "Read more";
      }
    });
  });
}

init();
