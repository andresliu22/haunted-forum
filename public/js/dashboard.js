const newPostForm = document.querySelector('#new-post-form');

const handlePostForm = async (event) => {
    event.preventDefault();
    const location = document.getElementById('post-location').value.trim();
    const specific_location = document.getElementById('post-specific-location').value.trim();
    const image_link = document.getElementById('post-img').value.trim();
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    console.log(JSON.stringify({ "location_id": 1, specific_location, image_link, title, body }))
    
    if (location && specific_location && image_link && title && body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ location_id: 1, specific_location, image_link, title, body }),
            headers: { 'Content-Type': 'application/json' },
        });
        response.ok ? console.log("Post Created") : console.log("Bad Request");
    }  
}

newPostForm.addEventListener('submit', handlePostForm);