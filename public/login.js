document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('signin-btn');
  if (!loginBtn) return;

  loginBtn.addEventListener('click', async function () {
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;

    const res = await fetch('http://137.184.104.153:5000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Signed in!');
    } else {
      alert(data.error || 'Sign in failed.');
    }
  });
});
