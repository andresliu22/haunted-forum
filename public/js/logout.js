const handleLogout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/')
    : alert('There was an error logging out!');
};

document.getElementById('logoutBtn').addEventListener('click', handleLogout);

document.querySelector('.new-post').addEventListener('mouseover', () => {
  document.querySelectorAll('.new-post i')[0].classList.toggle('rotated');
});

