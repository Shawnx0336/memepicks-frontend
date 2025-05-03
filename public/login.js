document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.querySelector("#signInButton");
  const signUpBtn = document.querySelector("#signUpButton");

  if (signInBtn) {
    signInBtn.addEventListener("click", signIn);
  }

  if (signUpBtn) {
    signUpBtn.addEventListener("click", signUp);
  }

  const token = localStorage.getItem("token");
  if (token) {
    document.querySelector("#signInButton")?.classList.add("hidden");
    document.querySelector("#signUpButton")?.classList.add("hidden");
    // Optionally update UI with user info here
  }
});

function closeAuthModal() {
console.log("Closing modal..."); // <-- Add this
  document.querySelectorAll(".modal-auth").forEach(modal => modal.classList.add("hidden"));
}

async function signIn(event) {
  event.preventDefault();

  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  try {
    const response = await fetch("https://api.memepicks.fun/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log("Signin Response:", data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Signed in successfully!");
      closeAuthModal();
      location.reload(); // Refresh UI to reflect login
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Network or server error");
  }
}

async function signUp(event) {
  event.preventDefault();

  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;

  try {
    const response = await fetch("https://api.memepicks.fun/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Signup Response:", data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Account created!");
      closeAuthModal();
      location.reload(); // Refresh UI to reflect login
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Server or network error");
  }
}
