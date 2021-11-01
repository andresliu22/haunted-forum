const handleLogin = async (e) => {
  e.preventDefault();
  const username = document
    .querySelectorAll('form input')[0]
    .value.trim()
    .toLowerCase();
  const password = document.querySelectorAll('form input')[1].value;

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/main')
    : alert('There was an error logging in. Try again!');
};

document
  .querySelectorAll('form button')[1]
  .addEventListener('click', handleLogin);
