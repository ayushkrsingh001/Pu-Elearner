// login.js — put <script src="login.js"></script> at the end of your login HTML

// --- Cookie helpers ---
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};${expires};path=/`;
}

function getCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// --- Main ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm") || document.querySelector("form");
  if (!form) {
    console.error("login.js: No form found (expected id='loginForm' or a <form>).");
    return;
  }

  const loginBtn = document.getElementById("loginBtn") || form.querySelector("button[type='submit'], button");

  // Optional: Uncomment if you *do* want immediate auto-redirect when cookie exists
  // const existingUser = getCookie("username");
  // if (existingUser) { window.location.href = "dashboard.html"; return; }

  // Submit handler (works for submit and programmatic submit)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
  });

  // If button is a plain button, make sure clicking it logs in
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      // if it's type="button" the form won't auto-submit, so call handler
      if (loginBtn.type === "button") {
        e.preventDefault();
        handleLogin();
      }
      // if type="submit" the form submit event will handle it
    });
  }

  function handleLogin() {
    const usernameEl = document.getElementById("username") || document.querySelector("input[name='username']");
    const passwordEl = document.getElementById("password") || document.querySelector("input[name='password']");

    const username = usernameEl ? usernameEl.value.trim() : "";
    const password = passwordEl ? passwordEl.value.trim() : "";

    if (!username) { alert("Please enter username"); if (usernameEl) usernameEl.focus(); return; }
    if (!password) { alert("Please enter password"); if (passwordEl) passwordEl.focus(); return; }

    // ------ Demo auth (replace with real authentication) ------
    const DEMO_USER = "admin";
    const DEMO_PASS = "1234";

    if (username === DEMO_USER && password === DEMO_PASS) {
      // Store only username (or a server-issued token). Don't store raw passwords.
      setCookie("username", username, 7); // cookie valid 7 days
      console.log("Login successful. Cookies:", document.cookie);
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password");
    }
  }
});

// --- expose logout globally so dashboard can call it ---
window.logout = function() {
  eraseCookie("username");
  window.location.href = "login.html";
};
