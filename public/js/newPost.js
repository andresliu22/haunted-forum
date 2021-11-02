// Google Places autocomplete for New Post
const newPostInput = document.getElementById('post-location');
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