async function signIn(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://api.memepicks.fun/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signed in successfully!");
      console.log("Token:", data.token);
      // optionally store in localStorage
      // localStorage.setItem('token', data.token);
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Network or server error");
  }
}
