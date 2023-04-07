const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("next-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

// array of all quotes
let quotes = [];

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  showLoader();
  // get random quote from array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // say unknown if there is not author name
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // make text smaller if it's long
  if (quote.text.length > 90) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoader();
}

// Getting quote from APi
async function getQuote() {
  showLoader();
  const apiUrl = "https://type.fit/api/quotes";
  const response = await fetch(apiUrl);
  quotes = await response.json();
  newQuote();
}

getQuote();

// Event listeners
newQuoteBtn.addEventListener("click", () => {
  newQuote();
});
twitterBtn.addEventListener("click", () => {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -- ${authorText.textContent}`;
  window.open(url);
});
