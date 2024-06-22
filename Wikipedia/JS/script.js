//
const inputTextElement = document.getElementById("input-text");
const searchBtnElement = document.getElementById("search-btn");
const resultsElement = document.getElementById("results");

//
const fetchPages = async () => {
  const inputText = inputTextElement.value.trim();
  if (!inputText) {
    resultsElement.innerHTML = `<div class='error'>Please enter search term.</div>`;
    return;
  }
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=50&format=json&origin=*&srsearch=${inputText}`
    );
    const data = await response.json();
    const cardsList = data.query.search;
    if (cardsList.length < 1) {
      resultsElement.innerHTML = `<div class='error'>No matching results.</div>
                  `;
      return;
    }
    const cardsHTML = cardsList
      .map((card) => {
        return `<div class="result">
                  <h2>${card.title}</h2>
                  <p>${card.snippet}</p>
                  <a href="http://en.wikipedia.org/?curid=${card.pageid}" target="_blank">read more</a>
                </div>`;
      })
      .join("");

    resultsElement.innerHTML = cardsHTML;
  } catch (error) {
    console.error(error);
    resultsElement.innerHTML = `<div class='error'>Something went wrong. Please try again.</div>
                  `;
  }
};

//
searchBtnElement.addEventListener("click", () => {
  fetchPages();
});

//
inputTextElement.addEventListener("keyup", () => {
  if (!inputTextElement.value.trim()) {
    resultsElement.innerHTML = "";
  }
});

// oie remember pls insert loader here