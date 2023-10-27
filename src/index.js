import "../src/style.css";

const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const nextQuoteButton = document.querySelector("#nextQuoteButton");

let bgColorIndex = 0;
const bgColors = ["bg-blue-700", "bg-red-700", "bg-green-700", "bg-yellow-700", "bg-purple-700", "bg-pink-700", "bg-gray-700", "bg-indigo-700", "bg-orange-700", "bg-teal-700"];

let colorIndex = 1;
const colors = ["blue-700", "red-700", "green-700", "yellow-700", "purple-700", "pink-700", "gray-700", "indigo-700", "orange-700", "text-teal-700"];

function getNextQuote() {
  const bodyElement = document.querySelector("#body");

  bodyElement.className = `flex h-screen w-screen items-center justify-center transition ease-in-out ${bgColors[bgColorIndex]}`;
  authorElement.className = `mx-2 text-end font-semibold ${colors[colorIndex]} transition ease-in-out`;
  quoteElement.className = `my-4 font-sans text-2xl font-bold tracking-tight ${colors[colorIndex]} transition ease-in-out`;

  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      quoteElement.textContent = `"${randomQuote.text}"`;
      authorElement.textContent = `- ${randomQuote.author}`;
    })
    .catch((error) => {
      console.error(error);
    });

  colorIndex = (colorIndex + 1) % colors.length;
  bgColorIndex = (bgColorIndex + 1) % bgColors.length;
}
nextQuoteButton.addEventListener("click", getNextQuote);

getNextQuote();
