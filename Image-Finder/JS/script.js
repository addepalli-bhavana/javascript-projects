//
const inputTextElement = document.getElementById("input-text");
const searchBtnElement = document.getElementById("search-btn");
const showMoreBtnElement = document.getElementById("show-more-btn");
const resultsElement = document.getElementById("results");

//
const accessKey = "rw6M0g6hMepRaLC82nJfn-jCa4FQycQSOoQ5VZJ6vDI";
let page;

//
const fetchImages = async () => {
  const inputText = inputTextElement.value.trim();
  if (!inputText) {
    resultsElement.innerHTML = `<div class='error'>Please enter search term</div>`;
    return;
  }
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=${accessKey}`
    );
    const data = await response.json();
    const imagesList = data.results;
    if (imagesList.length < 1) {
      resultsElement.innerHTML = `<div class='error'>No matching results.</div>`;
      return;
    }
    if (page === 1) {
      resultsElement.innerHTML = "";
      showMoreBtnElement.style.display = "none";
    }
    let imagesHTML = imagesList
      .map((image) => {
        return `<div class="result">
      <img src=${image.urls.small} alt = ${image.alt_description}/>
      <a href=${image.links.html} target = "_blank">download</a>
      </div>`;
      })
      .join("");
    resultsElement.innerHTML = resultsElement.innerHTML + imagesHTML;
    page++;
    if (page > 1) {
      showMoreBtnElement.style.display = "block";
    }
  } catch (error) {
    console.error(error);
    resultsElement.innerHTML = `<div class='error'>Something went wrong. Please try again</div>
                  `;
  }
};

//
searchBtnElement.addEventListener("click", () => {
  page = 1;
  fetchImages();
});

//
showMoreBtnElement.addEventListener("click", () => {
  fetchImages();
});

//
inputTextElement.addEventListener("keyup", () => {
  if (!inputTextElement.value.trim()) {
    resultsElement.innerHTML = "";
    showMoreBtnElement.style.display = "none";
  }
});
