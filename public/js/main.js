const input = document.getElementById('searchInput');
const searchArea = document.querySelector('.search-column');
const button = searchArea.querySelector('button');

const searchAutocomplete = new google.maps.places.Autocomplete(input, {
  types: ['(cities)'],
});

// Only allows the search button to be clicked once it has at least one comma, and there is a city/state/country
document.body.addEventListener('mouseover', () => {
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

const handleSearch = async (e) => {
  e.preventDefault();
  document.querySelector('.results-column').style.display = 'flex';
  document.querySelector('.arrow-container').style.opacity = '100%';
};

button.addEventListener('click', handleSearch);

//HIDE the .results-column and the .arrow-container UNTIL the search button is clicked!
