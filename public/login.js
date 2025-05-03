document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#signInButton");
  if (button) {
    button.addEventListener("click", signIn);
  }
});

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
      alert("Signed in successfully!");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Network or server error");
  }
}
