import { escapeHTML } from "./validation.js";

const BASE_URL = "";

async function fetchCurrentUser() {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

function renderNav(user) {
  const nav = document.getElementById("mainNav");

  if (user) {
    nav.innerHTML = `
            <a href="/create">Add product</a>
            <p>|</p>
            <button id="logoutBtn">Log out</button>
          `;

    document.getElementById("logoutBtn").addEventListener("click", async () => {
      try {
        await fetch(`${BASE_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        window.location.reload();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    });
  } else {
    nav.innerHTML = `
            <a href="/login.html">Sign in</a>
            <p>|</p>
            <a href="/register.html">Sign up</a>
          `;
  }
}

function renderUserBox(user) {
  const box = document.getElementById("userBox");
  if (!user) return;

  document.getElementById("userName").textContent = user.name;

  const roleEl = document.getElementById("userRole");
  roleEl.textContent = user.role;
  roleEl.className = "user-role" + (user.role === "admin" ? " role-admin" : "");

  box.style.display = "flex";
}

function renderProducts(products, user) {
  const list = document.getElementById("productList");

  if (!products || products.length === 0) {
    list.innerHTML = `<p style="padding: 1rem; color: gray;">No products available.</p>`;
    return;
  }

  list.innerHTML = products
    .map((p) => {
      const authActions = user
        ? `<a
                      class="review-link"
                      href="/add-review?productId=${p._id}"
                      title="Add review"
                    >
                      <img
                        src="/assets/reviews.png"
                        alt="Add review"
                        width="20"
                        height="20"
                      />
                    </a>`
        : "";

      return `
              <li class="product-card">
                <div class="product-meta">
                  <h3>${escapeHTML(p.name)}</h3>
                  <span class="stock ${p.stock === 0 ? "out" : ""}">
                    ${p.stock === 0 ? "Out of stock" : `In stock: ${p.stock}`}
                  </span>
                </div>
                <p class="product-description">${escapeHTML(p.description) || "No description"}</p>
                <div class="product-meta">
                  <span class="price">$${p.price}</span>
                  <span class="product-category">${escapeHTML(p.category) || "General"}</span>
                </div>
                <div class="card-actions">
                  <a class="btn-card btn-card--reviews" href="/reviews.html?productId=${p._id}">
                    Reviews
                  </a>
                  ${authActions}
                </div>
              </li>
            `;
    })
    .join("");
}

async function loadProducts(user) {
  try {
    const res = await fetch(`${BASE_URL}/api/products?limit=100`);
    const data = await res.json();
    renderProducts(data.data, user);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

async function init() {
  const currentUser = await fetchCurrentUser();
  renderNav(currentUser);
  renderUserBox(currentUser);
  await loadProducts(currentUser);
}

init();
