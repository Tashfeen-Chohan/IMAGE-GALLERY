let searchForm = document.getElementById("searchForm");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");
let showMore = document.getElementById("showMore");
let noImgFound = document.getElementById("noImgFound");

let accessKey = "-oMxmieDC5ednNHvcdAe3QzjME1EL9uTYclcbesCJu8";
let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  let url = `https://api.unsplash.com/search/photos/?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  let response = await fetch(url);
  let data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  if (results.length === 0) {
    noImgFound.style.display = "block";
    showMore.style.display = "none"
  } else {
    results.map((result) => {
      let image = document.createElement("img");
      image.src = result.urls.small;
      let imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
    showMore.style.display = "block";
    noImgFound.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

searchForm.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    page = 1;
    searchImages();
  }
});

showMore.addEventListener("click", function () {
  page++;
  searchImages();
});
