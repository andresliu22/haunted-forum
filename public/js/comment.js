// Adds a comment from the single post page
const addComment = async (event) => {
    event.preventDefault();
    document.getElementById("comment-btn").disabled = true;

    const body = document.querySelector("#new-comment").value.trim();
    if (!body) {
        alert('Fill out the comment field');
        return;
    }
    const response = await fetch(`/api/post/${document.location.href[document.location.href.length-1]}/comment`, {
        method: 'POST',
        body: JSON.stringify({body}),
        headers: {'Content-Type': 'application/json'}});

    response.ok? document.location.reload(): alert('Failed to add comment');
};

document.querySelector("#comment-form").addEventListener('submit', addComment);

