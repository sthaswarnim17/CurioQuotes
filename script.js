const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const tweetBtn = document.getElementById("tweet-quote");
const loader = document.getElementById("loader");

const quoteHistory = [];

// Fetch a new quote from DummyJSON API
async function getQuote() {
  showLoading(true);

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    const quote = data.quote;
    const author = data.author;

    // Update DOM
    quoteText.innerHTML = `"${quote}"`;
    authorText.innerHTML = `— ${author}`;

    // Store quote in history
    quoteHistory.push({ quote, author });

    animateQuote();
  } catch (error) {
    quoteText.innerHTML = "Failed to load quote.";
    authorText.innerHTML = "";
    console.error("Error:", error);
  } finally {
    showLoading(false);
  }
}

// Animate quote on change
function animateQuote() {
  quoteText.classList.add("fade-in");
  authorText.classList.add("fade-in");
  setTimeout(() => {
    quoteText.classList.remove("fade-in");
    authorText.classList.remove("fade-in");
  }, 500);
}

// Show/hide loader
function showLoading(show) {
  loader.classList.toggle("hidden", !show);
  newQuoteBtn.disabled = show;
}

// Copy quote to clipboard
function copyQuote() {
  const textToCopy = `${quoteText.innerText} ${authorText.innerText}`;
  navigator.clipboard.writeText(textToCopy)
    .then(() => alert("✅ Quote copied to clipboard!"))
    .catch(err => console.error("❌ Copy failed:", err));
}

// Tweet quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText + " " + authorText.innerText)}`;
  window.open(tweetUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);
tweetBtn.addEventListener("click", tweetQuote);
const toggleThemeBtn = document.getElementById("toggle-theme");

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    toggleThemeBtn.textContent = "☀️ Light Mode";
  } else {
    toggleThemeBtn.textContent = "🌙 Dark Mode";
  }
}

toggleThemeBtn.addEventListener("click", toggleTheme);

// Initial quote load
getQuote();
