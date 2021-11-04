const handleLogout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  response.status === 200
    ? document.location.replace('/login')
    : alert('There was an error logging out!');
};

if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

document.querySelector('.new-post').addEventListener('mouseover', () => {
  document.querySelectorAll('.new-post i')[0].classList.toggle('rotated');
});

const handleVote = async (e) => {
  const id = e.target.getAttribute('data-id');
  const pTag = e.target.nextElementSibling;

  const response = await fetch(`/api/posts/${id}/upvote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    e.target.disabled = true;
    // document.location.reload();
    pTag.innerText = `Upvotes: ${parseInt(pTag.innerText.split(' ')[1]) + 1}`;
  } else {
    alert('Cannot vote twice');
  }
};

if (document.querySelector('.vote-btn')) {
  document.querySelector('.vote-btn').addEventListener('click', handleVote);
}
