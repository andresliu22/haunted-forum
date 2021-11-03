// Google Places autocomplete for New Post
const newPostInput = document.getElementById("post-location");
const newPostBtn = document.querySelector("#createPostBtn");
const newPostForm = document.querySelector("#new-post-form");

const newAutocomplete = new google.maps.places.Autocomplete(newPostInput, {
  types: ["(cities)"],
});

// URL verification
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const isUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (err) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

document.querySelector(".modal-content").addEventListener("mouseover", () => {
  if (
    !newPostInput.value ||
    !newPostInput.value.includes(",") ||
    newPostInput.value.split(" ").length < 2
  ) {
    newPostBtn.disabled = true;
  } else {
    newPostBtn.disabled = false;
  }
});

const handleNewPost = async (e) => {
  e.preventDefault();
  const location = document
    .querySelectorAll(".modal-body input")[0]
    .value.trim();
  const specific_location = document
    .querySelectorAll(".modal-body input")[1]
    .value.trim();
  const image_link = document
    .querySelectorAll(".modal-body input")[2]
    .value.trim();
  const title = document.querySelectorAll(".modal-body input")[3].value.trim();
  const body = document.querySelectorAll(".modal-body textarea")[0].value;

  // console.log(location, specific_location, image_link, title, body);

  if (!location || !specific_location || !image_link || !title || !body) {
    alert("Please fill in all the fields!");
    return;
  }

  if (body.length < 15) {
    alert("Make sure the body is longer than 15 characters!");
    return;
  }

  if (title.length > 45) {
    alert("The title is too long!");
    return;
  }

  if (isUrl(image_link) === false) {
    alert("Please make sure you insert a valid link for the image!");
    return;
  }

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      location,
      specific_location,
      image_link,
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  response.ok
    ? document.location.replace("/dashboard")
    : alert("You can only post once every 10 minutes!");
};

newPostForm.addEventListener("submit", handleNewPost);
