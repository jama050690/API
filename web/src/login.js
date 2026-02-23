
const BASE_API_URL = "http://localhost:3000";

const form = document.getElementById("loginForm");
const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");
const githubLoginBtn = document.getElementById("githubLoginBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await login(data);
    const result = await res.json();
    if (!res.ok) {
      alert(result.message || "Login failed");
      return;
    }

    alert(result.message);
    window.location.href = "/index";
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});

export async function login(data) {
  return await fetch(`${BASE_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

toggle.addEventListener("click", () => {
  const isHidden = password.type === "password";

  password.type = isHidden ? "text" : "password";
  toggle.classList.toggle("fa-eye");
  toggle.classList.toggle("fa-eye-slash");
});

googleLoginBtn.addEventListener("click", () => {
  window.location.href = `${BASE_API_URL}/login/google`;
});

githubLoginBtn.addEventListener("click", () => {
  console.log("github login bosildi...");

  const clientId = "Ov23liNC95TRppWEAjf0";
  const redirectUri = `${BASE_API_URL}/auth/github/callback`;

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=user:email`;

  window.location.href = githubAuthUrl;
});
