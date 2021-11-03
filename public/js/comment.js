const urlId = document.location.href.split('/')[4];

// Adds a comment from the single post page
const addComment = async (event) => {
  event.preventDefault();
  document.getElementById('comment-btn').disabled = true;

  const body = document.querySelector('#new-comment').value.trim();
  if (!body) {
    alert('Fill out the comment field');
    document.getElementById('comment-btn').disabled = false;
    return;
  }

  const response = await fetch(`/api/posts/${urlId}/comment`, {
    method: 'POST',
    body: JSON.stringify({ body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
    return;
  }
  alert('Failed to add comment');
  document.getElementById('comment-btn').disabled = false;
};

document.querySelector('#comment-form').addEventListener('submit', addComment);

const deleteComment = async (e) => {
  e.preventDefault();
  const id = e.target.getAttribute('data-id');
  const response = await fetch(`/api/posts/${urlId}/comment`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' },
  });
  response.ok ? document.location.reload() : alert('Failed to delete!');
};

if (document.querySelector('.delete-comment-btn')) {
  document
    .querySelector('.delete-comment-btn')
    .addEventListener('click', deleteComment);
}
