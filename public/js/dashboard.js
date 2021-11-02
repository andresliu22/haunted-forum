const newPostForm = document.querySelector('#new-post-form');

const handleNewPost = async (e) => {
  e.preventDefault();
  const location = document
    .querySelectorAll('.modal-body input')[0]
    .value.trim();
  const specific_location = document
    .querySelectorAll('.modal-body input')[1]
    .value.trim();
  const image_link = document
    .querySelectorAll('.modal-body input')[2]
    .value.trim();
  const title = document.querySelectorAll('.modal-body input')[3].value.trim();
  const body = document
    .querySelectorAll('.modal-body textarea')[0]
    .value.trim();

  console.log(location, specific_location, image_link, title, body);

  if (!location || !specific_location || !image_link || !title || !body) {
    alert('Please fill in all the fields!');
    return;
  }

  if (body.length < 15) {
    alert('Make sure the body is longer than 15 characters!');
  }

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      location,
      specific_location,
      image_link,
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/dashboard')
    : alert('Post failed, try again!');
};

newPostForm.addEventListener('submit', handleNewPost);
