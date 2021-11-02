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

// Google Places autocomplete for New Post
const newPostInput = document.querySelector('#post-location');
const newPostBtn = document.querySelector('#createPostBtn');

const newAutocomplete = new google.maps.places.Autocomplete(newPostInput, {
  types: ['(cities)'],
});

document.querySelector('.modal-content').addEventListener('mouseover', () => {
  if (
    !newPostInput.value ||
    !newPostInput.value.includes(',') ||
    newPostInput.value.split(' ').length < 2
  ) {
    newPostBtn.disabled = true;
  } else {
    newPostBtn.disabled = false;
  }
});
