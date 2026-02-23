const BASE_API_URL = "http://localhost:3000";
const form = document.getElementById("loginForm");
const googleLoginBtn = document.getElementById("googleLoginBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  let res;
  try {
    res = await register(data);
    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Registration failed");
      return;
    }

    alert(result.message);
    form.reset(); // ixtiyoriy
    window.location.href = "/login.html";
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});

googleLoginBtn.addEventListener("click", () => {
  window.location.href = `${BASE_API_URL}/login/google`;
});

export async function register(data) {
  return await fetch(`${BASE_API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
