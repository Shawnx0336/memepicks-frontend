async function signIn() {
console.log('SignIn triggered');
  try {
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;

    const response = await fetch('https://api.memepicks.fun/...
', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.error || 'Sign-in failed.');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('isSignedIn', 'true');
    showToast('Signed in successfully!');
  } catch (error) {
    showToast('Sign-in failed.');
  }
}
