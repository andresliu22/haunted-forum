const input = document.getElementById('searchInput');
const searchArea = document.querySelector('.search-column');

const autocomplete = new google.maps.places.Autocomplete(input, {
  types: ['(cities)'],
});

// Only allows the button to be clicked once it has at least one comma, and there is a city/state/country
document.body.addEventListener('mouseover', () => {
  const button = searchArea.querySelector('button');
  if (
    !input.value ||
    !input.value.includes(',') ||
    input.value.split(' ').length < 2
  ) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});
