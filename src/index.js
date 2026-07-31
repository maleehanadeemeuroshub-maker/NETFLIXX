let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    let wasClosed = this.childNodes[1].classList.contains("fa-plus");

    // Close every FAQ item first
    for (let j = 0; j < accordian.length; j++) {
      accordian[j].childNodes[1].classList.remove("fa-times");
      accordian[j].childNodes[1].classList.add("fa-plus");
      accordian[j].nextElementSibling.style.maxHeight = null;
    }

    // Re-open the clicked one only if it was previously closed
    if (wasClosed) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
      let content = this.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* ---------- Sign in modal ---------- */
function openSigninModal() {
  const overlay = document.getElementById("signinModalOverlay");
  if (overlay) {
    overlay.classList.add("active");
  }
  const emailInput = document.getElementById("signinEmail");
  const passwordInput = document.getElementById("signinPassword");
  if (emailInput) emailInput.value = "";
  if (passwordInput) passwordInput.value = "";
  setSigninMode("signin");
}

function closeSigninModal() {
  const overlay = document.getElementById("signinModalOverlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
  clearSigninErrors();
}

function clearSigninErrors() {
  const emailInput = document.getElementById("signinEmail");
  const passwordInput = document.getElementById("signinPassword");
  const emailError = document.getElementById("signinEmailError");
  const passwordError = document.getElementById("signinPasswordError");

  if (emailInput) emailInput.classList.remove("input__error");
  if (passwordInput) passwordInput.classList.remove("input__error");
  if (emailError) emailError.textContent = "";
  if (passwordError) passwordError.textContent = "";
}

const signinOverlay = document.getElementById("signinModalOverlay");
if (signinOverlay) {
  signinOverlay.addEventListener("click", function (e) {
    if (e.target === signinOverlay) {
      closeSigninModal();
    }
  });
}

const signinForm = document.getElementById("signinForm");
/* ---------- Local account store (simulates a real signup/signin check) ---------- */
const ACCOUNTS_KEY = "netflix_demo_accounts";

function getAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function findAccount(email) {
  return getAccounts().find(
    (acc) => acc.email.toLowerCase() === email.toLowerCase()
  );
}

// Seed one demo account the first time, so there's something to sign in with.
(function seedDemoAccount() {
  const accounts = getAccounts();
  if (accounts.length === 0) {
    saveAccounts([{ email: "demo@netflix.com", password: "demo1234" }]);
  }
})();

/* ---------- Sign In / Sign Up mode ---------- */
let signinMode = "signin"; // or "signup"

function setSigninMode(mode) {
  signinMode = mode;
  clearSigninErrors();
  const title = document.getElementById("signinModalTitle");
  const submitBtn = document.getElementById("signinSubmitBtn");
  const toggleText = document.getElementById("signinToggleText");

  if (mode === "signup") {
    title.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    toggleText.innerHTML =
      'Already have an account? <a href="#" id="signinToggleLink">Sign in</a>';
  } else {
    title.textContent = "Sign In";
    submitBtn.textContent = "Sign In";
    toggleText.innerHTML =
      'New to Netflix? <a href="#" id="signinToggleLink">Sign up now</a>';
  }
  document
    .getElementById("signinToggleLink")
    .addEventListener("click", function (e) {
      e.preventDefault();
      setSigninMode(signinMode === "signin" ? "signup" : "signin");
    });
}

const initialToggleLink = document.getElementById("signinToggleLink");
if (initialToggleLink) {
  initialToggleLink.addEventListener("click", function (e) {
    e.preventDefault();
    setSigninMode(signinMode === "signin" ? "signup" : "signin");
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearSigninErrors();

    const emailInput = document.getElementById("signinEmail");
    const passwordInput = document.getElementById("signinPassword");
    const emailError = document.getElementById("signinEmailError");
    const passwordError = document.getElementById("signinPasswordError");

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (email === "") {
      emailInput.classList.add("input__error");
      emailError.textContent = "Please enter your email.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailInput.classList.add("input__error");
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (password === "") {
      passwordInput.classList.add("input__error");
      passwordError.textContent = "Please enter your password.";
      isValid = false;
    } else if (password.length < 4) {
      passwordInput.classList.add("input__error");
      passwordError.textContent = "Password must be at least 4 characters.";
      isValid = false;
    }

    if (!isValid) return;

    if (signinMode === "signup") {
      if (findAccount(email)) {
        emailInput.classList.add("input__error");
        emailError.textContent = "An account with this email already exists.";
        return;
      }
      const accounts = getAccounts();
      accounts.push({ email, password });
      saveAccounts(accounts);
      window.location.href = "streamzone.html";
    } else {
      const account = findAccount(email);
      if (!account) {
        emailInput.classList.add("input__error");
        emailError.textContent =
          "No account found with this email. Please sign up first.";
        return;
      }
      if (account.password !== password) {
        passwordInput.classList.add("input__error");
        passwordError.textContent = "Incorrect password.";
        return;
      }
      window.location.href = "streamzone.html";
    }
  });
}

/* ---------- Get Started email checks (hero + FAQ sections) ---------- */
function handleGetStarted(inputId, errorId) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (!input || !errorEl) return;

  const email = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  input.classList.remove("input__error");
  errorEl.textContent = "";

  if (email === "") {
    input.classList.add("input__error");
    errorEl.textContent = "Please enter your email.";
    return;
  }

  if (!emailPattern.test(email)) {
    input.classList.add("input__error");
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }

  if (!findAccount(email)) {
    input.classList.add("input__error");
    errorEl.textContent =
      "No account found with this email. Please sign up first.";
    return;
  }

  window.location.href = "streamzone.html";
}