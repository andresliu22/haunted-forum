const editPostForm = document.querySelector('#updatePostBtn');
const deletePost = document.querySelector('#deletePostBtn');

const handleEditPost = async (e) => {
  const post_id = e.target.getAttribute('data-post');
  console.log("RAWREARSAA");
  console.log(post_id);
  const location = document
    .querySelectorAll('.edit-modal-body input')[0]
    .value.trim();
  const specific_location = document
    .querySelectorAll('.edit-modal-body input')[1]
    .value.trim();
  const image_link = document
    .querySelectorAll('.edit-modal-body input')[2]
    .value.trim();
  const title = document.querySelectorAll('.edit-modal-body input')[3].value.trim();
  const body = document
    .querySelectorAll('.edit-modal-body textarea')[0]
    .value.trim();

  console.log(location, specific_location, image_link, title, body);

  if (!location || !specific_location || !image_link || !title || !body) {
    alert('Please fill in all the fields!');
    return;
  }

  if (body.length < 15) {
    alert('Make sure the body is longer than 15 characters!');
  }

  const response = await fetch(`/api/posts/:${post_id}`, {
    method: 'PUT',
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

const handleDeletePost = async (e) => {
    const post_id = e.target.getAttribute('data-post');
    const response = await fetch(`/api/posts/:${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      response.ok
        ? document.location.replace('/dashboard')
        : alert('Post failed, try again!');
}
// $(document).ready(function() {

//     $('a[data-toggle=modal], button[data-toggle=modal]').click(function (event) {
  
//         const post = event.target.getAttribute('data-post');
//         console.log(post);
//     })
//   });

editPostForm.addEventListener('click', handleEditPost);
deletePost.addEventListener('click', handleDeletePost);

