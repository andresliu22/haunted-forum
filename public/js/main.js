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

const renderPosts = (posts) => {
  console.log(posts);
  posts.forEach((post) => {
    const aTag = document.createElement('a');
    aTag.setAttribute('href', `/posts/${post.id}`);
    aTag.classList.add('post-card');
    aTag.classList.add('mb-2');
    aTag.classList.add('w-100');
    aTag.style.height = '175px';
    aTag.style.textDecoration = 'none';
    const body = post.body.slice(0, 149);
    const date = new Date(post.creation_date).toLocaleDateString();
    const time = new Date(post.creation_date).toLocaleTimeString();
    aTag.innerHTML = `<div class="card w-100" style="height: 160px overflow: hidden; margin-top: 10px;">
    <div class="card-body d-flex w-100 flex-column">
    <div>
      <img class="float-left" src="${post.image_link}" style="max-width:60px">
    </div>
    <div>
      <h5 class="card-title" style="color: black;">${post.title}</h5>
      <h6>Posted on ${date} at ${time}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Specific Area: <b style="color:black">${post.specific_location}</b></h6>
      <p class="card-text">${body}</p>
    </div>
    <div class="w-100 d-flex justify-content-evenly">
    <p>Upvotes: ${post.upVotes}</p>
  </div>
  </div>
  </div>`;
    document.querySelector('#contentDiv').appendChild(aTag);
  });
};

const handleSearch = async (e) => {
  e.preventDefault();
  document.querySelector('#contentDiv').innerHTML = '';
  // Display the results div and the arrow
  document.querySelector('.results-column').style.display = 'flex';
  document.querySelector('.arrow-container').style.opacity = '100%';

  const response = await fetch(`/api/posts?location=${input.value}`);
  const posts = await response.json();
  if (!response.ok) {
    const error = document.createElement('h1');
    error.innerText = 'There are currently no posts under this location!';
    document.querySelector('#contentDiv').appendChild(error);
  } else {
    renderPosts(posts);
  }
};

button.addEventListener('click', handleSearch);

//HIDE the .results-column and the .arrow-container UNTIL the search button is clicked!
