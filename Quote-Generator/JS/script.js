// reference to html elements
const quoteElement = document.getElementById("quote");
const newQuoteButtonElement = document.getElementById("new-quote-btn");
const quoteAuthorElement = document.getElementById("quote-author");
const quoteGeneratorElement = document.getElementById("quote-generator");
const twitterButtonElement = document.getElementById("twitter-btn");

// function to fetch and display a new quote
const getQuote = async () => {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const result = await response.json();
    const quote = result[Math.floor(Math.random() * result.length)];
    quoteAuthorElement.innerText = quote.author
      ? `- ${quote.author}`
      : "Unknown";

    quoteElement.innerText = quote.text;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

// function to update the twitter button href with the current quote and current quote author
const updateTwitterBtn = () => {
  twitterButtonElement.href = `https://twitter.com/intent/tweet?text=${quoteElement.innerText} - ${quoteAuthorElement.innerText}`;
};

// event listener for twitter button
twitterButtonElement.addEventListener("click", updateTwitterBtn);

// event listener for new quote button
newQuoteButtonElement.addEventListener("click", getQuote);

// displays a new quote on page load
document.addEventListener("DOMContentLoaded", getQuote);
