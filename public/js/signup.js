// On keyup within the password fields, let's check to see if the two passwords are matching and let the user know whether or not they are
const handleSignup = async (e) => {
  e.preventDefault();
  const email = document
    .querySelectorAll('form input')[0]
    .value.trim()
    .toLowerCase();
  const username = document
    .querySelectorAll('form input')[1]
    .value.trim()
    .toLowerCase();
  const passwords = [
    document.querySelectorAll('form input')[2].value,
    document.querySelectorAll('form input')[3].value,
  ];

  // CURRENTLY, WE ARE USING ALERTS
  // We should NOT do this in the final product
  if (!email || !username || !passwords[0] || !passwords[1]) {
    alert('Please fill out all fields!');
    return;
  }

  if (passwords[0] !== passwords[1]) {
    alert('Passwords not matching!');
    return;
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email, username, password: passwords[0] }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/main')
    : alert('An error occurred. Please try again.');
};

document
  .querySelectorAll('form button')[1]
  .addEventListener('click', handleSignup);
