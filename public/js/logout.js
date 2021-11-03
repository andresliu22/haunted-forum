const handleLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  response.ok
    ? document.location.replace("/")
    : alert("There was an error logging out!");
};

document.getElementById("logoutBtn").addEventListener("click", handleLogout);

document.querySelector(".new-post").addEventListener("mouseover", () => {
  document.querySelectorAll(".new-post i")[0].classList.toggle("rotated");
});

const handleVote = async (e) => {
  const id = e.target.getAttribute("data-id");

  console.log(id);

  const response = await fetch(`/api/posts/${id}/upvote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // document.querySelector(".vote-btn").disabled = true;
    console.log("Upvoted");
    document.location.reload();
  } else {
    alert("Cannot vote twice");
  }
};

if (document.querySelector(".vote-btn")) {
  document.querySelector(".vote-btn").addEventListener("click", handleVote);
}
