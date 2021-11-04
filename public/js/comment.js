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


const addReply = async (event) => {
  const comment_id = parseInt(event.target.getAttribute('data-comment-id'));
  const btnId = event.currentTarget.index;
  console.log(btnId);
  const replies = document.getElementsByClassName('new-reply');
  let body;

  for (let index = 0; index < replies.length; index++) {
    if (index == parseInt(btnId)) {
      body = replies[index].value;
      console.log(body)
    }
  }

  if (!body) {
    alert('Fill out the reply field');
    return;
  }

  console.log(comment_id);

  const response = await fetch(`/api/posts/comments/${comment_id}/reply`, {
    method: 'POST',
    body: JSON.stringify({ body, comment_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
    return;
  }
  alert('Failed to add reply');
}

const replyBtns = document.querySelectorAll('.reply-btn');
for (let i = 0; i< replyBtns.length; i++) {
  replyBtns[i].addEventListener('click', addReply);
  replyBtns[i].index = i;
}




const deleteReplyBtns = document.querySelectorAll('.delete-reply-btn');
for (let i = 0; i< deleteReplyBtns.length; i++) {
  deleteReplyBtns[i].addEventListener('click', deleteReply);
  deleteReplyBtns[i].index = i;
}